const sinon = require('sinon');

const userHandler = require('../../../../../bin/modules/user/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/user/repositories/commands/command_handler');
const queryHandler = require('../../../../../bin/modules/user/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/user/utils/validator');

describe(__filename, () => {

  let req, res;

  beforeEach(() => {
    res = {
      send: sinon.stub()
    };
    req = {
      body: {}
    };
  });

  describe('registerUser', () => {

    it('should return error validation', () => {
      sinon.stub(validator, 'isValidRegisterUser').resolves({ err: 'err'});

      userHandler.registerUser(req, res);
      validator.isValidRegisterUser.restore();
    });

    it('should return success', async () => {
      sinon.stub(validator, 'isValidRegisterUser').resolves({ err: null });
      sinon.stub(commandHandler, 'registerUser').resolves({ err: null });

      await userHandler.registerUser(req, res);
      validator.isValidRegisterUser.restore();
      commandHandler.registerUser.restore();
    });
  });

  describe('postDataLogin', () => {

    it('should return error validation', () => {
      sinon.stub(validator, 'isValidLogin').resolves({ err: 'err'});

      userHandler.postDataLogin(req, res);
      validator.isValidLogin.restore();
    });

    it('should return password invalid', async () => {
      sinon.stub(validator, 'isValidLogin').resolves({ err: null });
      sinon.stub(commandHandler, 'postDataLogin').resolves({
        err: 'password invalid!',
        data: null
      });

      await userHandler.postDataLogin(req, res);
      validator.isValidLogin.restore();
      commandHandler.postDataLogin.restore();
    });

    it('should return success login', async () => {
      sinon.stub(validator, 'isValidLogin').resolves({ err: null });
      sinon.stub(commandHandler, 'postDataLogin').resolves({ err: null });

      await userHandler.postDataLogin(req, res);
      validator.isValidLogin.restore();
      commandHandler.postDataLogin.restore();
    });
  });

  describe('getUser', () => {
    it('should return error', async () => {
      sinon.stub(queryHandler, 'getUser').resolves({ err: 'err' });

      await userHandler.getUser(req, res);
      queryHandler.getUser.restore();
    });

    it('should return success', async () => {
      sinon.stub(queryHandler, 'getUser').resolves({ err: null });

      await userHandler.getUser(req, res);
      queryHandler.getUser.restore();
    });
  });
});
