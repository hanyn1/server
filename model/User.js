const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  image: String,
});

const User = mongoose.model('User', UserSchema, 'user');

module.exports = {
  User: User,  // Export the User model
};
