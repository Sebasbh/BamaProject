// Import dependencies
import jwt from 'jsonwebtoken';
import moment from 'moment';

// Define secret key
const secret = "8JUZMS6/g+IcEo6YHYBOwcspL5TA33JDnjznKh+kIO4=";

// Function to create tokens
const createToken = (user) => {
  const payload = {
    _id: user._id, 
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(1, "hours").unix(),
  };

  // Return encoded jwt token
  console.log(user.role);
  return jwt.sign(payload, secret);
};

export { secret, createToken };
