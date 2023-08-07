const createTokenUser = (user) => {
  return {
    userId: user[0][0].id,
    email: user[0][0].email,
    userName: user[0][0].userName,
  };
};
module.exports = createTokenUser;
