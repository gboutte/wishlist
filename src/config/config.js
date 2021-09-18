require('dotenv').config();

module.exports = {
  use_env_variable: 'DATABASE_URL',
  development: {
    use_env_variable: 'DATABASE_URL',
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
  }
};
