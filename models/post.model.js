const mongoose = require('mongoose');
const Counter = require('counter');
const PostSchema = new mongoose.Schema({
  post_id : {
    type: Number,
    required: true,
    unique: true,
  },user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL to the image
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  datePosted: {
    type: Date,
    default: Date.now,
  },
});



PostSchema.pre('save', async function(next) {
    const post = this;
    if (post.isNew) {
      try {
        const counter = await Counter.findOneAndUpdate(
          { id: 'post_id' },
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
  

const Post = mongoose.model('Post',PostSchema);

module.exports = Post;
