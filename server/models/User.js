const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Lütfen bir kullanıcı adı girin'],
    unique: true, 
    trim: true    
  },
  email: {
    type: String,
    required: [true, 'Lütfen bir email girin'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Lütfen geçerli bir email adresi girin'
    ]
  },
  password: {
    type: String,
    required: [true, 'Lütfen bir şifre girin'],
    minlength: 6
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);