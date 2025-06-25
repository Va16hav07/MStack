const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const legalEntitySchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: { type: String, required: true },
  legal_name: { type: String, required: true },
  legal_entity_type: { type: String, enum: ['PARENT_ENTITY', 'SUB_ENTITY'], required: true },
  address: { type: String },
  incorporation_date: { type: Date },
  is_default: { type: Boolean, default: false },
  registration_number: { type: String },
  tax_identifier: { type: String },
  jurisdiction_country: { type: String },
  functional_currency: { type: String },
  tenant_id: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('LegalEntity', legalEntitySchema);
