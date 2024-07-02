const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const User = require('../Models/user'); // Adjust the path accordingly
const user = require('../Models/user');
dotenv.config();

const generateToken = async (req, res) => {
        
    let userObject = await user.findOne({email:req.body.email});

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: userObject._id,
        email: user.email
    };

    const token = jwt.sign(data, jwtSecretKey);

    return token;  // Return the response here
        
   
}

module.exports = generateToken;  // Export the function directly
