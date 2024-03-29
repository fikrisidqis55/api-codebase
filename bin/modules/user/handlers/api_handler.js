
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const registerUser = async (req, res) => {
  const payload = req.body;

  const validatePayload = await validator.isValidRegisterUser(payload);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.registerUser(payload);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Can not Register new User!', httpError.BAD_REQUEST)
      : wrapper.response(res, 'success', result, 'Success Register new User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const postDataLogin = async (req, res) => {
  const payload = req.body;

  const validatePayload = await validator.isValidLogin(payload);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.postDataLogin(payload);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Login User')
      : wrapper.response(res, 'success', result, 'Success Login User!', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const getUser = async (req, res) => {
  const { userId } = req;

  const getData = async () => queryHandler.getUser(userId);

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get User', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Success Get User!', http.OK);
  };
  sendResponse(await getData());
};

const updateUser = async (req, res) => {
  const payload = {
    ...req.params,
    ...req.body
  };

  const validatePayload = await validator.isValidUpdateUser(payload);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.updateUser(payload);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Can not Update new User!', httpError.BAD_REQUEST)
      : wrapper.response(res, 'success', result, 'Success Update new User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  registerUser,
  postDataLogin,
  getUser,
  updateUser
};
