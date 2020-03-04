require('dotenv').config();

module.exports = {
  ORGANIZATION: process.env.ORGANIZATION,
  TOKEN: process.env.TOKEN,
  PORT: process.env.PORT || 3000
};
