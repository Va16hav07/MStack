const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const privilegeSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, default: true },
  resource: { type: String, required: true },
  tenant_id: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Privilege', privilegeSchema); 