// Config environment variables
require("dotenv").config();

const express = require("express");
// connect to database
require("./database/connect")();
// Cross origin resource sharing
const cors = require("cors");
// routes import
const routes = require("./Routes");

const app = express();

// use express json parser and cors middleware to be able to
// have communication between front and back end.
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", routes.userRoute);
app.use("/api/chats", routes.chatRoute);
app.use("/api/messages", routes.messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome to my tesli chat app APIs");
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});