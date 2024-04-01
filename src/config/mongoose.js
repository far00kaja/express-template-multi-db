const mongoose = require('mongoose');
const logger = require('./logger');
const mongoString = process.env.MONGODB_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    logger.info(error)
})

database.once('connected', () => {
    logger.info('Database Mongodb Connected');
})

module.exports= mongoose;