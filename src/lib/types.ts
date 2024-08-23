export type DBSeedConfiguration = {
  /** MongoDB connection string */
  databaseConnectionString: string;

  /** Database name */
  databaseName: string;

  /** Object that defines what collections to populate */
  populate: {
    collectionExample: boolean;
  };

  /** If true, the collections will be cleaned before populating */
  cleanBeforePopulate: boolean;
};

export type CollectionName = keyof DBSeedConfiguration['populate'];
