const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const organizationSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  tenant_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  organization_type: { type: String, enum: ['CUSTOMER', 'PARTNER', 'INTERNAL'], default: 'CUSTOMER' },
  email: { type: String, required: true },
  phone: { type: String },
  website: { type: String },
  logo_url: { type: String },
  industry: { type: String },
  annual_revenue: { type: String },
  employee_count: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  organization_profile: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Organization', organizationSchema); 