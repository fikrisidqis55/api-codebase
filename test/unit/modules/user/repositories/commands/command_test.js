const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/user/repositories/commands/command');

describe(__filename, () => {

  describe('insertOneUser', () => {
    const queryResult = {
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'testinguser',
        'password': '8789ad457ac341e4fc4cad32'
      }
    };

    it('should success save user', async() => {
      const db = {
        setCollection: sinon.stub(),
        insertOne: sinon.stub().resolves(queryResult)
      };

      const command = new Command(db);
      const res = await command.insertOneUser({});

      assert.equal(res.data.username, queryResult.data.username);
    });
  });

});
