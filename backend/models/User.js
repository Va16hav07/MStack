const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  tenant_id: {
    type: String,
    required: true,
  },
  organization_id: {
    type: String,
    required: false,
  },
  tenant_region_url: {
    type: String,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 