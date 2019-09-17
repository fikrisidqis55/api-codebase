
const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/user/repositories/queries/query');

describe(__filename, () => {

  describe('findOneUser', () => {
    const db = {
      setCollection: sinon.stub(),
      findOne: sinon.stub().resolves({
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
      })
    };

    it('should return success', async() => {
      const query = new Query(db);
      const result = await query.findOneUser({});

      assert.notEqual(result.data, null);
      assert.equal(result.data.username, 'testinguser');
    });
  });

  describe('findById', () => {
    const db = {
      setCollection: sinon.stub(),
      findOne: sinon.stub().resolves({
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
      })
    };

    it('should return success', async() => {
      const query = new Query(db);
      const result = await query.findById('5bac53b45ea76b1e9bd58e1c');

      assert.notEqual(result.data, null);
      assert.equal(result.data.username, 'testinguser');
    });
  });
});
