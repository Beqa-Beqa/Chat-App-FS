const models = require("../database/Model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  // import jwt secret key
  const jwtkey = process.env.JWT_SECRET_KEY;
  // Sign the key: uID,   secKey,  expiration option
  return jwt.sign({_id}, jwtkey, {expiresIn: "30d"});
}

const registerUser = async (req, res) => {
  try {
    // user filled info.
    const {name, email, password} = req.body;
    // check for user if already exists
    let user = await models.userModel.findOne({email});

    // this code is already self explanatory
    if(user) return res.status(400).json({message: "Email is already in use!"});
    if(!name || !email || !password) return res.status(400).json({message: "Insufficient credentials!"});
    if(!validator.isEmail(email)) return res.status(400).json({message: "Invalid Email!"});
    if(!validator.isStrongPassword(password)) return res.status(400).json({message: "Password is not strong enough!"});

    // Define new user.
    user = new models.userModel({name, email, password});
    // Generate salt for hashed password
    const salt = await bcrypt.genSalt(10);
    // Update password to hashed and salted password
    user.password = await bcrypt.hash(password, salt);
    // Save defined user
    await user.save();

    // Generate JWT
    const token = createToken(user._id);

    // Send back info including token.
    res.status(201).json({
      _id: user._id, 
      name, 
      email, 
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    // Found user in database
    let user = await models.userModel.findOne({ email });
    
    if(!user) return res.status(400).json({message: "Invalid credentials"});
    // Compare passwords if it's valid true will be returned otherwise false
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) return res.status(400).json({message: "Invalid email or password"});

    // Generate token
    const token = createToken(user._id);

    res.status(200).json({_id: user._id, name: user.name, email, token});

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const findUser = async (req, res) => {
  try {
    const userId = req.paramas.userId;

    const user = await models.userModel.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } 
}

const getUsers = async (req, res) => {
  try {
    const users = await models.userModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } 
}

module.exports = { registerUser, loginUser, findUser, getUsers };