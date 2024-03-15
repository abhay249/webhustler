const dotenv = require('dotenv');
const mongoose = require('mongoose');
const logger = require('./logger/index');

// console.log(process.env);
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get("env"));

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
  // .connect(process.env.DATABASE_LOCAL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    logger.info('db connected');
    console.log('DB connections successfully !!');
  });

const port = process.env.PORT || 3000;
// const hostname = "0.0.0.0";
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection!! Shutting down the server...');
  console.log(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received ,Shuting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

//  Git hub commands

// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin https://github.com/Leonuch/flex.git
// git push -u origin main
