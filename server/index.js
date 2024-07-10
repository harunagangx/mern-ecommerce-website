const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const connectDb = require('./config/connectDb');
const errorMiddleware = require('./middlewares/error');

const app = express();

// CONFIG
if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: './config/config.env' });
}

connectDb();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES IMPORT
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const uploadRoute = require('./routes/uploadRoute');
const orderRoute = require('./routes/orderRoute');

app.use('/api/v1', userRoute);
app.use('/api/v1', categoryRoute);
app.use('/api/v1', productRoute);
app.use('/api/v1', uploadRoute);
app.use('/api/v1', orderRoute);

__dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
