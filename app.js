const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const servicesRouter = require('./ROUTER/servicesRouter');
const viewsRouter = require('./ROUTER/viewsRouter');

app.enable('trust proxy');

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(`${__dirname}/`));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: ["'self'", 'https:', 'http:'],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        workerSrc: ["'self'", 'data:', 'blob:'],
        childSrc: ["'self'", 'blob:'],
        imgSrc: ["'self'", 'data:', 'blob:'],
        formAction: ["'self'"],
        connectSrc: [
          "'unsafe-inline'",
          "'self'",
          'data:',
          'blob:',
          'https://bundle.js:*',
          'https://kit.fontawesome.com/',
          'https://maxcdn.bootstrapcdn.com/',
          'https://ajax.googleapis.com/',
          'ws://127.0.0.1:*/',
          'https://127.0.0.1:5000/',
        ],
        upgradeInsecureRequests: [],
      },
    },
  })
);

app.use(helmet());

// Development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP,Please try again in an hour',
});

app.use('/api', limiter);

app.use(express.json({ limit: '500kB', parameterLimit: 50000 }));

app.use(
  express.urlencoded({
    extended: true,
    limit: '200kB',
    parameterLimit: 1000,
  })
);

app.use(cookieParser());

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data Sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration'],
  })
);

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use('/', viewsRouter);
app.use('/service', servicesRouter);

module.exports = app;
