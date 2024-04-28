const mongoose = require("mongoose");

const connectToDb = async () => mongoose.connect(process.env.MONGO_URI)
                                        .then(() => console.log("Connected to mongodb server"))
                                        .catch((err) => console.log("Something went wrong\n " + err));

module.exports = connectToDb;