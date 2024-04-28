const express = require("express");
const controllers = require("../Controllers");

// defining router
const router = express.Router();

// rotuer route
router.post("/register", controllers.userRegister);
router.post("/login", controllers.userLogin);
router.get("/find/:userId", controllers.findUser);
router.get("/", controllers.getUsers);

// using express.Router instead of "const app = express()" let's you create "mini app"
// which is mostly similar to the main app, except it lets you seperate complex logic of routes
// in different folders which makes project more maintainable and readable.

module.exports = router;