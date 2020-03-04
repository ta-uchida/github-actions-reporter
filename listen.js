const ENV = require('./environments');

module.exports = function (app) {
  app.listen(ENV.PORT, () => console.log(`app listening start on port ${ENV.PORT}!`))
};
