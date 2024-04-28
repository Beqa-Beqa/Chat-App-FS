const userModel = require("./userController");

module.exports = {
  userRegister: userModel.registerUser,
  userLogin: userModel.loginUser,
  findUser: userModel.findUser,
  getUsers: userModel.getUsers
}