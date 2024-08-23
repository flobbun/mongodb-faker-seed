import { configDotenv } from 'dotenv';
import main from './src/main';

// Validate .env file
const DATABASE_CONNECTION_STRING = configDotenv().parsed?.DATABASE_CONNECTION_STRING;
if (!DATABASE_CONNECTION_STRING) {
  console.error('Missing DATABASE_CONNECTION_STRING in .env file');
  process.exit(1);
}

// Start and configure the db-seed package
main({
  databaseConnectionString: DATABASE_CONNECTION_STRING,
  databaseName: 'demo',
  populate: {
    collectionExample: true,
  },
  cleanBeforePopulate: true,
});
