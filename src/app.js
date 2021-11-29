const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const confirmationRouter = require('./routes/confirmation');
const asusRouter = require('./routes/asus');
const dellRouter = require('./routes/dell');
const detailRouter = require('./routes/detail');

const accountRouter = require('./components/account/accountRouter');
const customerRouter = require('./components/customer/customerRouter');
const discountRouter = require('./components/discount/discountRouter');
const offerRouter = require('./components/offer/offerRouter');
const orderRouter = require('./components/order/orderRouter');
const orderDetailRouter = require('./components/OrderDetail/OrderDetailRouter');
const productRouter = require('./components/product/productRouter');
const staffRouter = require('./components/staff/staffRouter');

// try to connect to database
const db = require('./config/database');
db.connect();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/category', productRouter);
app.use('/confirmation', confirmationRouter);
app.use('/asus', asusRouter);
app.use('/dell', dellRouter);
app.use('/detail', detailRouter);
app.use('/users', usersRouter);

app.use('/api/account', accountRouter);
app.use('/api/customer', customerRouter);
app.use('/api/discount', discountRouter);
app.use('/api/offer', offerRouter);
app.use('/api/order', orderRouter);
app.use('/api/order_detail', orderDetailRouter);
app.use('/api/product', productRouter);
app.use('/api/staff', staffRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
