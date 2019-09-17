const assert = require('assert');
const sinon = require('sinon');

const command = require('../../../../../../bin/modules/user/repositories/commands/command');
const query = require('../../../../../../bin/modules/user/repositories/queries/query');
const jwtAuth = require('../../../../../../bin/auth/jwt_auth_helper');
const User = require('../../../../../../bin/modules/user/repositories/commands/domain');

describe(__filename, () => {

  const queryResult = {
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

  const db = {
    setCollection: sinon.stub()
  };

  const user = new User(db);

  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9';

  describe('registerUser', () => {

    let payload = {
      'name': 'Testing User',
      'username': 'testinguser',
      'password': 'telkomdev123',
      'email': 'testinguser@domain.com',
      'phone': '08001202100'
    };

    it('should return error', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);

      const res = await user.registerUser(payload);
      assert.notEqual(res.err, null);

      query.prototype.findOneUser.restore();
    });

    it('should success register user', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves({ data: null});
      sinon.stub(command.prototype, 'insertOneUser').resolves(queryResult);

      const res = await user.registerUser(payload);
      assert.equal(res.data.username, 'testinguser');

      query.prototype.findOneUser.restore();
      command.prototype.insertOneUser.restore();
    });
  });

  describe('generateCredential', () => {

    let payload = {
      'username': 'testinguser',
      'password': 'telkomdev123'
    };

    it('should return error', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves({ err: 'err'});

      const res = await user.generateCredential(payload);
      assert.notEqual(res.err, null);

      query.prototype.findOneUser.restore();
    });

    it('should return user invalid', async() => {
      let payload = {
        'username': 'alifsndev',
        'password': 'telkomdev123'
      };

      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);

      const res = await user.generateCredential(payload);
      assert.notEqual(res.err, null);

      query.prototype.findOneUser.restore();
    });

    it('should generate jwt token', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      sinon.stub(jwtAuth, 'generateToken').resolves(token);

      const res = await user.generateCredential(payload);
      assert.equal(res.data, token);

      query.prototype.findOneUser.restore();
      jwtAuth.generateToken.restore();
    });
  });

});
