const express = require('express');
const router = express.Router({ mergeParams: true });
const { v4: uuidv4 } = require('uuid');
const LegalEntity = require('../models/LegalEntity');

// GET /api/v1/tenants/:tenant_id/legal-entities
router.get('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    const { page = 1, page_size = 10 } = req.query;
    const filter = { tenant_id };
    const skip = (parseInt(page) - 1) * parseInt(page_size);
    const entities = await LegalEntity.find(filter).skip(skip).limit(Math.min(parseInt(page_size), 100));
    res.json({
      success: true,
      data: entities.map(e => ({
        id: e.id,
        name: e.name,
        tenant_id: e.tenant_id,
        legal_name: e.legal_name,
        legal_entity_type: e.legal_entity_type,
        address: e.address,
        incorporation_date: e.incorporation_date,
        is_default: e.is_default,
        registration_number: e.registration_number,
        tax_identifier: e.tax_identifier,
        jurisdiction_country: e.jurisdiction_country,
        functional_currency: e.functional_currency
      })),
      message: 'Legal entities fetched successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: 'InternalServerError',
        message: 'Internal server error',
        details: {}
      },
      trace_id
    });
  }
});

// POST /api/v1/tenants/:tenant_id/legal-entities
router.post('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    const { name, legal_name, legal_entity_type, address, incorporation_date, is_default, registration_number, tax_identifier, jurisdiction_country, functional_currency } = req.body;
    if (!name || !legal_name || !legal_entity_type || !tenant_id) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'name, legal_name, legal_entity_type, and tenant_id are required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const entity = await LegalEntity.create({
      name, legal_name, legal_entity_type, address, incorporation_date, is_default, registration_number, tax_identifier, jurisdiction_country, functional_currency, tenant_id
    });
    res.status(201).json({
      success: true,
      data: {
        id: entity.id,
        name: entity.name,
        tenant_id: entity.tenant_id,
        legal_name: entity.legal_name,
        legal_entity_type: entity.legal_entity_type,
        address: entity.address,
        incorporation_date: entity.incorporation_date,
        is_default: entity.is_default,
        registration_number: entity.registration_number,
        tax_identifier: entity.tax_identifier,
        jurisdiction_country: entity.jurisdiction_country,
        functional_currency: entity.functional_currency
      },
      message: 'Legal entity created successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: 'InternalServerError',
        message: 'Internal server error',
        details: {}
      },
      trace_id
    });
  }
});

// GET /api/v1/tenants/:tenant_id/legal-entities/:id
router.get('/:id', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id, id } = req.params;
    if (!tenant_id || !id) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'BadRequest',
          message: 'tenant_id and id are required in path',
          details: {}
        },
        trace_id
      });
    }
    const entity = await LegalEntity.findOne({ tenant_id, id });
    if (!entity) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Legal entity not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        id: entity.id,
        name: entity.name,
        tenant_id: entity.tenant_id,
        legal_name: entity.legal_name,
        legal_entity_type: entity.legal_entity_type,
        address: entity.address,
        incorporation_date: entity.incorporation_date,
        is_default: entity.is_default,
        registration_number: entity.registration_number,
        tax_identifier: entity.tax_identifier,
        jurisdiction_country: entity.jurisdiction_country,
        functional_currency: entity.functional_currency
      },
      message: 'Legal entity fetched successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: 'InternalServerError',
        message: 'Internal server error',
        details: {}
      },
      trace_id
    });
  }
});

// PUT /api/v1/tenants/:tenant_id/legal-entities/:id
router.put('/:id', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id, id } = req.params;
    const { name, legal_name, legal_entity_type, address, incorporation_date, is_default, registration_number, tax_identifier, jurisdiction_country, functional_currency } = req.body;
    if (!tenant_id || !id) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'BadRequest',
          message: 'tenant_id and id are required in path',
          details: {}
        },
        trace_id
      });
    }
    const update = { name, legal_name, legal_entity_type, address, incorporation_date, is_default, registration_number, tax_identifier, jurisdiction_country, functional_currency };
    const entity = await LegalEntity.findOneAndUpdate(
      { tenant_id, id },
      update,
      { new: true }
    );
    if (!entity) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Legal entity not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        id: entity.id,
        name: entity.name,
        tenant_id: entity.tenant_id,
        legal_name: entity.legal_name,
        legal_entity_type: entity.legal_entity_type,
        address: entity.address,
        incorporation_date: entity.incorporation_date,
        is_default: entity.is_default,
        registration_number: entity.registration_number,
        tax_identifier: entity.tax_identifier,
        jurisdiction_country: entity.jurisdiction_country,
        functional_currency: entity.functional_currency
      },
      message: 'Legal entity updated successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: 'InternalServerError',
        message: 'Internal server error',
        details: {}
      },
      trace_id
    });
  }
});

module.exports = router; 