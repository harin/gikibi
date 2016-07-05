let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name: String
})

module.exports = mongoose.model('User', userSchema);