import faker from 'faker';

const fakeData = {
  newUsers: {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '11110000'
  },

  noEmailUsers: {
    username: faker.name.findName(),
    password: '11110000'
  },

  noPasswordUsers: {
    username: faker.name.findName(),
    email: faker.internet.email()
  },

  lessPass: {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '111'
  },

  noUsernameUsers: {
    email: faker.internet.email(),
    password: '11110000'
  }
};

export default fakeData;
