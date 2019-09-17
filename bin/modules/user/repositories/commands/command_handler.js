
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const user = new User(db);

const postDataLogin = async (payload) => {
  const postCommand = async payload => user.generateCredential(payload);
  return postCommand(payload);
};

const registerUser = async (payload) => {
  const postCommand = async payload => user.registerUser(payload);
  return postCommand(payload);
};

const updateUser = async (payload) => {
  const postCommand = async payload => user.updateUser(payload);
  return postCommand(payload);
};

module.exports = {
  postDataLogin,
  registerUser,
  updateUser
};
