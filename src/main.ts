import { connectToDatabase, insertDocuments, cleanDatabase } from './lib/db';
import { CollectionName, DBSeedConfiguration } from './lib/types';

/**
 * Entry point for the db-seed package
 */
export default async function main(config: DBSeedConfiguration) {
  console.info('Starting db-seed package...');

  // Connect to the database
  await connectToDatabase(config.databaseConnectionString, config.databaseName);

  const {
    populate,
    cleanBeforePopulate,
  } = config;

  // Check if database needs to be cleaned before populating
  if (cleanBeforePopulate) {
    console.info('Cleaning the database before populating');
    await cleanDatabase();
  }

  // Populate the store collections
  const promises = Object.entries(populate).map(async ([collectionName, shouldPopulate]) => {
    if (!shouldPopulate) return;

    // Get the generator for the collection
    const generator = await import(`./generators/${collectionName}`);

    console.info(`Populating collection ${collectionName}...`);

    // Validate if the generator exists
    if (!generator) {
      console.error(`Generator for ${collectionName} not found`);
      process.exit(1);
    }

    // Get the generated data from the generator
    const generatedData = generator.default as object[];

    // Validate if the generator is well defined
    if (!generatedData || !Array.isArray(generatedData)) {
      console.error(`Generated data for collection ${collectionName} not found`);
      process.exit(1);
    }

    // Add the promise to the list
    return insertDocuments(collectionName as CollectionName, generatedData);
  });

  // Wait for all promises to finish
  try {
    await Promise.all(promises);
    console.info('Database populated successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error populating the database', err);
    process.exit(1);
  }
}
