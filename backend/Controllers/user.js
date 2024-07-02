const user = require('../Models/user');
const bcrypt = require('bcrypt')
const generateToken = require('../Services/auth');

async function getAllUsers(req,res) {
  try {
    const users = await user.find();
    if (!users || users.length === 0) {
      return res.status(404).send("No users found");
    }

    // Remove password field from each user object before sending the response
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    return res.json(usersWithoutPassword);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ msg: 'Server error' });
  }
}

async function handleUserSignup(req,res) {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let existingUser = await user.findOne({ email});
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const newUser = new user({name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to database
    await newUser.save();
    let token = await generateToken(req, res);
    res.json({ 
      msg: 'User registered successfully',
      token: token
     });
   
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ msg: 'Server error' });
    
}
}


async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const foundUser = await user.findOne({ email });
    
    if (!foundUser) {
      return res.status(401).send("User not registered");
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).send("Incorrect Password");
    }

    let token = await generateToken(req, res);
    res.json({ 
      msg: 'Login successfully',
      token: token
     });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
}
module.exports={
    handleUserSignup,
    handleUserLogin,
    getAllUsers
}