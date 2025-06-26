const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const roleSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true, default: uuidv4 },
  name: { type: String, required: true },
  description: { type: String },
  tenant_id: { type: String, required: true },
  active: { type: Boolean, default: true },
  is_system_role: { type: Boolean, default: false },
  privileges: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

roleSchema.pre('save', function(next) {
  if (!this.id) this.id = uuidv4();
  next();
});

module.exports = mongoose.model('Role', roleSchema); 