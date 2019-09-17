const joi = require('joi');
const wrapper = require('../../../helpers/utils/wrapper');
const { BadRequestError } = require('../../../helpers/error');

const isValidRegisterUser = async (payload) => {
  const userSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
  }).label('Register User');
  const result = joi.validate(payload, userSchema);

  if (result.error) {
    const message = result.error.details[0].message;
    return wrapper.error(new BadRequestError(message));
  }
  return wrapper.data(true);
};

const isValidLogin = async (payload) => {
  const userSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
  }).label('Login User / Admin');
  const result = joi.validate(payload, userSchema);

  if (result.error) {
    const message = result.error.details[0].message;
    return wrapper.error(new BadRequestError(message));
  }
  return wrapper.data(true);
};

const isValidUpdateUser = async (payload) => {
  const userSchema = joi.object({
    userId: joi.string().required(),
    username: joi.string().allow(null),
    password: joi.string().allow(null)
  }).label('Update User');
  const result = joi.validate(payload, userSchema);

  if (result.error) {
    const message = result.error.details[0].message;
    return wrapper.error(new BadRequestError(message));
  }
  return wrapper.data(true);
};

module.exports = {
  isValidRegisterUser,
  isValidLogin,
  isValidUpdateUser
};
