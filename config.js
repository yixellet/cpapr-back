// mongod --dbpath /home/owgrant/mongodata
const { JWT_SECRET = '16b942f697c75e0f38205a1bebbf7d0ba8c77404ccbb1a381e60dc4e7d086767'} = process.env;
const { DB_URL = 'mongodb://localhost:27017/cpapr' } = process.env;
const { PORT = 4000 } = process.env;

module.exports = {
  JWT_SECRET,
  DB_URL,
  PORT,
};