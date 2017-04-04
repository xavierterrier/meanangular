import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import index from './routes/index';
import users from './routes/users';
import tasks from './routes/tasks';
import cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet
import * as mongoose from 'mongoose';
import * as cors from 'cors';

const app: express.Express = express();
// app.use((req, res, next) => {
//   console.log("a");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//get router
// var router = express.Router();

// //options for cors midddleware // 'Access-Control-Allow-Origin'
// const options:cors.CorsOptions = {
//   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
//   credentials: false,
//   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//   origin: "http://localhost:3001",
//   preflightContinue: false
// };

// //use cors middleware
//router.use(cors(options));




//app.use('/', index);
app.use('/api/users', users);
app.use('/api/tasks', tasks);

app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
app.use('/', express.static(path.join(__dirname, '../client')));

//enable pre-flight
//router.options("*", cors(options));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use((error: any, req, res, next) => {
    console.log("b");

    res.status(error['status'] || 500);
    res.render('error', {
      message: error.message,
      error
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use((error: any, req, res, next) => {
  res.status(error['status'] || 500);
  res.render('error', {
    message: error.message,
    error: {}
  });
  return null;
});



// Init MongoDB connection
let uri = 'mongodb://localhost/meanangular2';
mongoose.connect(uri, (err) => {
  if (err) {
    console.log(err.message);
    console.log(err);
  }
  else {
    console.log('Connected to MongoDb');
  }
});


export default app;