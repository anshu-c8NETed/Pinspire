require('dotenv').config()
const mongoose = require('mongoose')
const plm = require("passport-local-mongoose");
const dburi = process.env.DB_URI

// Add connection options and event handlers
mongoose.connect(dburi, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileimg: String,
  fullname: String,
  boards: [],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post"
    }
  ]
})

userSchema.plugin(plm)
module.exports = mongoose.model("user", userSchema)