const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const organizationSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true, default: uuidv4 },
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
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

organizationSchema.pre('save', function(next) {
  if (!this.id) this.id = uuidv4();
  next();
});

module.exports = mongoose.model('Organization', organizationSchema); 