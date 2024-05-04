const userModel = require("./userController");
const chatModel = require("./chatController");
const messageModel = require("./messageController");

module.exports = {
  userRegister: userModel.registerUser,
  userLogin: userModel.loginUser,
  findUser: userModel.findUser,
  getUsers: userModel.getUsers,
  createChat: chatModel.createChat,
  findUserChats: chatModel.findUserChats,
  findChat: chatModel.findChat,
  createMessage: messageModel.createMessage,
  getMessages: messageModel.getMessages
}