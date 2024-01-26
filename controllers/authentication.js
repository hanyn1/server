const { User } = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const TOKEN = process.env.TOKEN;

const login = async (req, res) => {
  try {
    console.log('Request Body:', req.body);  // Log the entire request body

    const { email, password } = req.body;
  
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({}, TOKEN);

    res.status(200).json({ token, firstName: user.firstName, lastName: user.lastName, email: user.email });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;


    // Check if the email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({}, TOKEN);

    // Respond with the token and user details
    res.status(200).json({ token, firstName, lastName, email });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, signup };
