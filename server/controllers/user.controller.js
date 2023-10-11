const User = require("../models/User");
const crypto = require("crypto");

const createUser = async (username, email, password) => {
  const respBody = {
    message: null,
    status: null,
  }
  const response = emailAlreadyExists(email)
  return response.then(async(res) => {
    if(res) {
        respBody.message = 'User exists';
        respBody.status = 409
    }
    const userModel = new User({
      id: crypto.randomUUID(),
      name: username,
      email: email,
      password: password,
      coursesPurchased: [],
      lastLogIn: Date.now(),
    });

    userModel
      .validate()
      .then(() => {
        userModel.save();
      })
      .then((savedUser) => {
        console.info("created user ", savedUser);
        respBody.message = 'User created successfully';
        respBody.status = 200
      })
      .catch((validationError) => {
        respBody.message = `user creation failed due to validation error ${validationError}`;
        respBody.status = 409
        console.error("validation error", validationError);
      })
      .catch((saveError) => {
        respBody.message = `user creation failed due to ${saveError}`;
        respBody.status = 409
        console.error("Error creating user", saveError);
      }).finally(() => {
        return respBody
      })
  });
};

const emailAlreadyExists = (email) => User.findOne({ email });

const getUser = (email, password) => {
  return User.findOne({ email, password });
};

const setCartItems = async(email, password, cartItems) => {
  if(email && password) {
    const updateResult = await User.updateOne({email, password}, {$set: {'cartItems': cartItems}});
    console.log(JSON.stringify(updateResult))
    return updateResult.matchedCount
  } else {
    throw Error('couldn\'t add cart items')
  }
}

const getCartItems = async(email, password) => {
  if(email && password) {
    const user = await User.findOne({email, password});
    return user["cartItems"];
  } else {
    throw Error('couldn\'t get cart items')
  }
}

module.exports = {
  createUser,
  getUser,
  setCartItems,
  getCartItems,
};
