
const joi = require('joi');
const sinon = require('sinon');

const validator = require('../../../../../bin/modules/user/utils/validator');

describe(__filename, () => {

  describe('valid register user', () => {

    it('Should fail register user', () => {
      validator.isValidRegisterUser(false);
    });

    it('Should success register', async () => {
      sinon.stub(joi, 'validate').resolves({ error: null });
      validator.isValidRegisterUser();

      joi.validate.restore();
    });
  });

  describe('valid login user', () => {

    it('Should fail login user', async () => {
      validator.isValidLogin(false);
    });

    it('Should success login user', async () => {
      sinon.stub(joi, 'validate').resolves({ error: null });
      validator.isValidLogin();

      joi.validate.restore();
    });
  });
});
