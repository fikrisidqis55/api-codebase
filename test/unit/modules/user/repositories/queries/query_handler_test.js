

const assert = require('assert');
const sinon = require('sinon');

const User = require('../../../../../../bin/modules/user/repositories/queries/domain');
const queryHandler = require('../../../../../../bin/modules/user/repositories/queries/query_handler');

describe(__filename, () => {
  const data = {
    success: true,
    data: {
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
    },
    message: 'Success Login User!',
    code: 200
  };

  describe('getUser', () => {

    it('should success get user', async() => {
      sinon.stub(User.prototype, 'viewUser').resolves(data);

      const res = await queryHandler.getUser('5bac53b45ea76b1e9bd58e1c');

      assert.notEqual(res.data, null);
      assert.equal(res.code, 200);

      User.prototype.viewUser.restore();
    });
  });
});
