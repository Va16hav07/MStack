const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PrivilegeSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true, default: uuidv4 },
  name: { type: String, required: true },
  description: String,
  resource: String,
  tenant_id: { type: String, required: true },
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

PrivilegeSchema.pre('save', function(next) {
  if (!this.id) this.id = uuidv4();
  next();
});

module.exports = mongoose.model('Privilege', PrivilegeSchema); 