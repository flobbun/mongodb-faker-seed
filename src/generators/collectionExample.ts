import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

export default [
  {
    _id: new ObjectId(faker.string.uuid()),
    name: faker.person.firstName(),
    age: faker.number.int(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
  }
]