const mongoose = require('mongoose');
const settings = require('../settings');

module.exports = testEnv => {
  const dbName = settings.db + (testEnv ? '-test' : '');

  const dbURL = process.env.DB_URL
  if (dbURL){
    console.log('get db url')
  }else{
    console.log('please set db url')
    process.exit(126)
  }

  mongoose.connect(dbURL + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.set('useCreateIndex', true);

  const db = mongoose.connection;
  db.on('connected', console.log.bind(console, '[database] Connected to MongoDB.'));
  db.on('error', console.error.bind(console, '[database] Error occured while connecting to MongoDB.'));
};