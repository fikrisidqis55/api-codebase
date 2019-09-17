
const Query = require('./query');
const model = require('./query_model');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class User {

  constructor(db){
    this.query = new Query(db);
  }

  async viewUser(userId) {
    const queryUser = await this.query.findById(userId);
    if (queryUser.err) {
      return wrapper.error(new NotFoundError('Can not Find User!'));
    }

    const userModel = model.user();
    userModel.userId = queryUser.data.user_id;
    userModel.username = queryUser.data.username;
    return wrapper.data(userModel);
  }

}

module.exports = User;
