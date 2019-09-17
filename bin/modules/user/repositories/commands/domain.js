
const uuidv4 = require('uuid/v4');
const Query = require('../queries/query');
const Command = require('./command');
const model = require('./command_model');
const wrapper = require('../../../../helpers/utils/wrapper');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const commonUtil = require('../../../../helpers/utils/common');
const { NotFoundError, UnauthorizedError, ConflictError } = require('../../../../helpers/error');

const algorithm = 'aes-256-ctr';
const secretKey = 'Dom@in2018';

class User {

  constructor(db){
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async registerUser(data) {
    let payload, chiperPwd, userModel;

    payload = {
      ...data
    };

    const queryUser = await this.query.findOneUser({ username: payload.username });

    if (queryUser.data) {
      return wrapper.error(new ConflictError('User Already Exist!'));
    }

    chiperPwd = await commonUtil.encrypt(payload.password, algorithm, secretKey);

    userModel = model.user();
    userModel.user_id = uuidv4();
    userModel.username = payload.username;
    userModel.password = chiperPwd;

    const { data:result } = await this.command.insertOneUser(userModel);

    return wrapper.data(result);
  }

  async generateCredential(payload) {
    const { username, password } = payload;

    const queryUser = await this.query.findOneUser({ username });
    if (queryUser.err) {
      return wrapper.error(new NotFoundError('User not found!'));
    }

    const userId = queryUser.data._id;
    const userName = queryUser.data.username;
    const pass = await commonUtil.decrypt(queryUser.data.password, algorithm, secretKey);
    if (username !== userName || pass !== password) {
      return wrapper.error(new UnauthorizedError('Password invalid!'));
    }

    const data = {
      username,
      sub: userId
    };
    const token = await jwtAuth.generateToken(data);

    return wrapper.data(token);
  }

  async updateUser(data) {
    let payload, userModel, result;

    payload = {
      ...data
    };
    // console.log(payload)

    const queryUser = await this.query.findOneUser({ user_id: payload.userId });
    if (queryUser.err) {
      return wrapper.error(new NotFoundError('User not found!'));
    }

    userModel = model.user();
    userModel.user_id = queryUser.data.user_id;

    (payload.username) ? userModel.username = payload.username : userModel.username = queryUser.data.username;

    userModel.password = queryUser.data.password;

    const {data : update} = await this.command.updateOneUser(userModel);

    result = model.resultUser();
    result.userId = update.user_id;
    result.username = update.username;
    result.password = update.password;

    return wrapper.data(result);

  }


}

module.exports = User;
