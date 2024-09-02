const mongoose = require('mongoose');
const Counter = require('counter');
const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    maxlength: 200,
  },
  avatar: {
    type: String,  // URL to the user's avatar image
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isNew) {
      try {
        const counter = await Counter.findOneAndUpdate(
          { id: 'user_id' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        user.user_id = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
  
module.exports = mongoose.model('User', UserSchema);
