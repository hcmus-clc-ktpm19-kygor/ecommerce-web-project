require('dotenv').config();
require('./helpers/helper');

const express = require('express');

const path = require('path');
const passport = require("./config/passport.config");
const flash = require('connect-flash');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const confirmationRouter = require('./routes/confirmation');
const productRouter = require('./components/product/productRouter');
const authRouter = require('./components/auth/authRouter');
const accountRouter = require('./components/account/accountRouter');
const cartRouter = require('./components/shopping/cart/cartRouter')
const apiRouter = require('./api/apiRouter');
const orderRouter = require('./components/order/orderRouter');


const loggedInUserGuard = require('./middlewares/loggedInUserGuard');
const userIdMiddleware = require('./middlewares/userIdMiddleware');

// try to connect to database
const db = require('./config/database.config');
db.connect();

const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, "components")]);
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// Passport middlewares
app.use(session({ secret: process.env.SESSION_SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

app.use(userIdMiddleware);

// Router middleware
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/account', loggedInUserGuard ,accountRouter);
app.use('/products', productRouter);
app.use('/confirmation', loggedInUserGuard, confirmationRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/api', apiRouter);
app.use('/order',orderRouter);

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
