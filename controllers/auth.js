const User = require("../models/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

function validationError(error) {
  return error instanceof mongoose.Error.ValidationError;
}

function isMongoError(error) {
  return error.code === 11000;
}


async function signup(req, res) {
    try {
      const { email, password} = req.body;

      const hasMissingCredentials = !email || !password
      if (hasMissingCredentials) {
        return res
        .status(400)
        .json({ message: "Email and password are required" });

      }

      const hasUser = await User.findOne({ email }).lean();
      if (hasUser) {
        return res.status(400).json({ message: "User in use" });
      }


  
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });
  
      req.session.currentUser = {
        email: newUser.email,
        _id: newUser._id,
      };


      return res.status(200);
    } catch (err) {
        if (validationError(error)) {
            return res.status(400).json({ message: error.message });
          }
          if (isMongoError(error)) {
            return res.status(400).json({ message: error.message });
          }
          return res.status(500).json({ message: error.message });
        }
  }

  
  
  async function login(req, res) {
    try {
      const { email, password } = req.body;
      const hasMissingCredentials = !email || !password;
  
      if (hasMissingCredentials) {
        return res
        .status(400)
        .json({ message: "Email and password are required" });

      }
  
      const user = await User.findOne({ email }).lean();
      if (!user) {
        return res
        .status(400)
        .json({ message: "Email and password are required" });

      }

      const hasCorrectPassword = await bcrypt.compare(password, user.password);
      if (hasCorrectPassword) {
        const { password, ...currentUser } = user;
        req.session.currentUser = currentUser;
        return res.status(200);
      }

    } catch (err) {
        if (validationError(error)) {
            return res.status(400).json({ message: error.message });
          }
          if (isMongoError(error)) {
            return res.status(400).json({ message: error.message });
          }
          return res.status(500).json({ message: error.message });
        }
  }
  
  async function logout(req, res) {
    try {
      await req.session.destroy();
      return res.status(200);
    } catch (err) {
      console.log(err);
    }
  }

  async function isLoggedIn(req, res) {
    try {
      const user = req.session.user;
      if (!user) {
        return res.status(400).json(null);
      }
      res.status(200).json(user);
    } catch (err) {}
  }


module.exports = {
  signup,
    login,
    logout,
    isLoggedIn}