const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const LegalEntitySchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true, default: uuidv4 },
  tenant_id: { type: String, required: true },
  name: { type: String, required: true },
  legal_name: String,
  legal_entity_type: String,
  address: String,
  incorporation_date: Date,
  is_default: Boolean,
  registration_number: String,
  tax_identifier: String,
  jurisdiction_country: String,
  functional_currency: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

LegalEntitySchema.pre('save', function(next) {
  if (!this.id) this.id = uuidv4();
  next();
});

module.exports = mongoose.model('LegalEntity', LegalEntitySchema);
