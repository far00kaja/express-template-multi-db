const dotenv=require('dotenv');
dotenv.config();
const redis = require('redis')
const redisClient = redis.createClient({
    url:process.env.REDIS_URL,
    
 })

module.exports = redisClient