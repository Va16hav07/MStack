const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const roleSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  tenant_id: { type: String, required: true },
  active: { type: Boolean, default: true },
  is_system_role: { type: Boolean, default: false },
  privileges: { type: [String], default: [] },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Role', roleSchema); 