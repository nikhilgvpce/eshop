const userContoller = require('../controllers/user.controller');
const courseController = require('../controllers/course.controller');

const registerUser = async (req, resp) => {
  const { username, email, password } = req.body;

  const result = await userContoller.createUser(username, email, password);
  if (result) {
    // https://stackoverflow.com/a/7088468
    resp.status(409).json({ response: result });
  } else {
    resp.status(200).json({ response: 'user created successfully!' });
  }
};

const getUser = async (req, resp) => {
  const { email, password } = req.body;
  const result = await userContoller.getUser(email, password);
  if (result) {
    // TODO: retrieve courses relevant to a user based on
    // email / user interests
    const courses = await courseController.getCourses();

    resp.status(200).json({ data: courses });
  } else {
    resp.status(401);
  }
};

const setCartItems = async (req, res) => {
  const { email, password, cartItems } = req.body;
  try {
    const result = await userContoller.setCartItems(email, password, cartItems);
    if (result > 0) {
      res.status(200);
    }
  } catch (err) {
    res.status(401)
  }
};

const getCartItems = async(req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userContoller.getCartItems(email, password);
    if(result) {
      res.status(200).json({cartItems: result})
    }
  } catch(err) {
    res.status(500)
  }
}

module.exports = {
  registerUser,
  getUser,
  setCartItems,
  getCartItems,
};
