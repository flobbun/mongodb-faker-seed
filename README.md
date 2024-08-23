# mongodb-faker-seed

This package is responsible for seeding the database with random realistic data, it's supossed to simulate a production like setup mainly for demonstration and manual testing purposes.

## Usage

To seed the database with random data, run the following command:

```bash
npm run seed
```

## Configuration

The package uses the `faker` library to generate random data. You can configure the behaviour of the script by modifying the `index.ts` file.

## Generators

The package provides a set of generators to create random data for the database. You can find them in the `generators` folder.
To add a new generator, create a new file in the `generators` folder and export the data that you want to seed, for example:

```typescript
export const generatedUsers = [
  {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    ...
  }
];

export default generatedUsers;
```

The file needs to be called like the collection you want to seed, for example `users.ts`.

Note that you need to also add the new collection name to `types.ts` and `index.ts` to make it available to the seeding script.
