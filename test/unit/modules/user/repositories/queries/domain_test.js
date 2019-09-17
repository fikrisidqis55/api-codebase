const User = require('../../../../../../bin/modules/user/repositories/queries/domain');
const query = require('../../../../../../bin/modules/user/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');


describe('viewUser', () => {

  const db = {
    setCollection: sinon.stub()
  };

  const user = new User(db);

  it('should return user data', async() => {

    let queryResult = {
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'user_id': 'f5fabf02-3454-4c6c-840e-9f7b4961852b',
        'name': 'Testing User',
        'username': 'testinguser',
        'password': '8789ad457ac341e4fc4cad32',
        'email': 'testinguser@domain.com',
        'phone': '08001202100',
        'role': 'user',
        'activation': 'false',
        'otp': null
      }
    };

    sinon.stub(query.prototype, 'findById').resolves(queryResult);

    const userId = '5bac53b45ea76b1e9bd58e1c';
    const result = await user.viewUser(userId);
    assert.equal(result.data.username, 'testinguser');

    query.prototype.findById.restore();
  });

  it('should return error', async() => {

    let queryResult = {
      'err': true,
      'data': null
    };

    sinon.stub(query.prototype, 'findById').resolves(queryResult);

    const userId = '5bac53b45ea76b1e9bd58e1c';
    const result = await user.viewUser(userId);
    assert.notEqual(result.err, null);

    query.prototype.findById.restore();
  });
});
