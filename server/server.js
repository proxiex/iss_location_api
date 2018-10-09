import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import config from './config/config';
import errorHandler from './utils/errorHandler';


// create express app
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(errorHandler());

app.get('/', (req, res) => res.status(200).json({
  message: 'You are welcome to Dear Diary, please hit a valid endpoint to get started.'
}));

app.use('/*', (req, res) => res.status(200).json({
  message: "This endpoint doesn't exist yet, checkback sometime in future an we may have it"
}));

const port = parseInt(config.port, 10) || 9001;

app.listen(port, () => console.log(`Running on localhost: 
  ${port} Node Env: ${process.env.NODE_ENV}`));

export default app;
