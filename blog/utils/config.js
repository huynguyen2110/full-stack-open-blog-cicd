require('dotenv').config()

const MONGO_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URL
  : process.env.MONGO_URL

const { PORT, SECRET } = process.env

module.exports = {
  MONGO_URL,
  PORT,
  SECRET,
}
