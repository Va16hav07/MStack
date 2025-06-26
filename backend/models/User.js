const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true, default: uuidv4 },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  tenant_id: { type: String, required: true },
  organization_id: { type: String },
  roles: [{ type: String }],
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', function(next) {
  if (!this.id) this.id = uuidv4();
  next();
});

module.exports = mongoose.model('User', UserSchema); 