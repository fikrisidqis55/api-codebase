
const assert = require('assert');
const sinon = require('sinon');

const User = require('../../../../../../bin/modules/user/repositories/commands/domain');
const commandHandler = require('../../../../../../bin/modules/user/repositories/commands/command_handler');

describe(__filename, () => {

  const data = {
    success: true,
    data: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    message: 'Success Login User!',
    code: 200
  };

  const payload = {
    'username': 'testinguser',
    'password': 'password@990'
  };

  describe('registerUser', () => {

    it('should info success register', async() => {
      sinon.stub(User.prototype, 'registerUser').resolves(data);

      const res = await commandHandler.registerUser(payload);

      assert.notEqual(res.data, null);
      assert.equal(res.code, 200);

      User.prototype.registerUser.restore();
    });
  });

  describe('postDataLogin', () => {

    it('should return access token', async() => {
      sinon.stub(User.prototype, 'generateCredential').resolves(data);

      const res = await commandHandler.postDataLogin(payload);

      assert.notEqual(res.data, null);
      assert.equal(res.code, 200);

      User.prototype.generateCredential.restore();
    });
  });
});
