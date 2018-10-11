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
  },

  issHistory: {
    valid: {
      location: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      },
      datetime: faker.random.number(1000, 99999),
      altitude: faker.random.number(1000, 99999),
      passes: [
        {
          risetime: faker.random.number(1000, 99999),
          duration: faker.random.number(1000, 99999)
        },
        {
          risetime: faker.random.number(1000, 99999),
          duration: faker.random.number(1000, 99999)
        }
      ]
    },
    noLatLng: {
      location: {},
      datetime: faker.random.number(1000, 99999),
      altitude: faker.random.number(1000, 99999),
      passes: [
        {
          risetime: faker.random.number(1000, 99999),
          duration: faker.random.number(1000, 99999)
        },
        {
          risetime: faker.random.number(1000, 99999),
          duration: faker.random.number(1000, 99999)
        }
      ]
    },
    noDatetime: {
      location: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      },
      altitude: faker.random.number(1000, 99999),
      passes: [
        {
          risetime: faker.random.number(1000, 99999),
          duration: faker.random.number(1000, 99999)
        },
        {
          risetime: faker.random.number(1000, 99999),
          duration: faker.random.number(1000, 99999)
        }
      ]
    },
    noAlt: {
      location: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      },
      datetime: faker.random.number(1000, 99999),
      passes: [
        {
          risetime: faker.random.number(1000, 99999),
          duration: faker.random.number(1000, 99999)
        },
        {
          risetime: faker.random.number(1000, 99999),
          duration: faker.random.number(1000, 99999)
        }
      ]
    },
    noPasses: {
      location: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      },
      datetime: faker.random.number(1000, 99999),
      altitude: faker.random.number(1000, 99999)
    },
  }
};

export default fakeData;
