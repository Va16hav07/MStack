const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tenantSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4,
  },
  name: { type: String, required: true },
  description: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  website: { type: String },
  logo_url: { type: String },
  industry: { type: String },
  annual_revenue: { type: String },
  employee_count: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  settings: {
    type: Object,
    default: {},
  },
  theme: {
    type: String,
    default: 'default',
  },
  language: {
    type: String,
    default: 'en',
  },
  timezone: {
    type: String,
    default: 'UTC',
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

tenantSchema.pre('save', function(next) {
  if (!this.id) this.id = uuidv4();
  next();
});

module.exports = mongoose.model('Tenant', tenantSchema); 