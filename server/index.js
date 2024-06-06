const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const connectDb = require('./config/connectDb');

const app = express();

if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: './config/config.env' });
}

connectDb();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
