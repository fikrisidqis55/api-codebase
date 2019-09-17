
const user = () => {
  const model = {
    user_id: '',
    username: '',
    password: ''
  };
  return model;
};

const resultUser = () => {
  const model = {
    userId: '',
    username: '',
    password: ''
  };
  return model;
};

module.exports = {
  user,
  resultUser
};
