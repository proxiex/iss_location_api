require('dotenv').config();

const { DATABASE_URL, PORT } = process.env;

const config = {
  db: DATABASE_URL,
  port: PORT
};

export default config;
