const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Tenant = require('../models/Tenant');

// POST /api/v1/tenants
router.post('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { name, description, email, phone, website, logo_url, industry, annual_revenue, employee_count, active } = req.body;
    if (!name || !email) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'Name and email are required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const existing = await Tenant.findOne({ email });
    if (existing) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'Tenant with this email already exists', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const tenant = await Tenant.create({
      name, description, email, phone, website, logo_url, industry, annual_revenue, employee_count, active
    });
    res.status(201).json({
      success: true,
      data: {
        id: tenant.id,
        name: tenant.name,
        description: tenant.description,
        email: tenant.email,
        phone: tenant.phone,
        website: tenant.website,
        logo_url: tenant.logo_url,
        industry: tenant.industry,
        annual_revenue: tenant.annual_revenue,
        employee_count: tenant.employee_count,
        active: tenant.active,
        created_at: tenant.created_at,
        updated_at: tenant.updated_at
      },
      message: 'Tenant created successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      trace_id
    });
  }
});

// GET /api/v1/tenants
router.get('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const tenants = await Tenant.find();
    res.json({
      success: true,
      data: tenants.map(tenant => ({
        id: tenant.id,
        name: tenant.name,
        description: tenant.description,
        email: tenant.email,
        phone: tenant.phone,
        website: tenant.website,
        logo_url: tenant.logo_url,
        industry: tenant.industry,
        annual_revenue: tenant.annual_revenue,
        employee_count: tenant.employee_count,
        active: tenant.active,
        created_at: tenant.created_at,
        updated_at: tenant.updated_at
      })),
      message: 'Tenants fetched successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      trace_id
    });
  }
});

// GET /api/v1/tenants/:id
router.get('/:id', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const tenant = await Tenant.findOne({ id: req.params.id });
    if (!tenant) {
      return res.status(422).json({
        detail: [
          { loc: ['params', 'id'], msg: 'Tenant not found', type: 'not_found' }
        ],
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        id: tenant.id,
        name: tenant.name,
        description: tenant.description,
        email: tenant.email,
        phone: tenant.phone,
        website: tenant.website,
        logo_url: tenant.logo_url,
        industry: tenant.industry,
        annual_revenue: tenant.annual_revenue,
        employee_count: tenant.employee_count,
        active: tenant.active,
        created_at: tenant.created_at,
        updated_at: tenant.updated_at
      },
      message: 'Tenant fetched successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      trace_id
    });
  }
});

// GET /api/v1/tenants/:id/settings
router.get('/:id/settings', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const tenant = await Tenant.findOne({ id: req.params.id });
    if (!tenant) {
      return res.status(422).json({
        detail: [
          { loc: ['params', 'id'], msg: 'Tenant not found', type: 'not_found' }
        ],
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        id: tenant.id,
        name: tenant.name,
        description: tenant.description,
        email: tenant.email,
        phone: tenant.phone,
        website: tenant.website,
        logo_url: tenant.logo_url,
        industry: tenant.industry,
        annual_revenue: tenant.annual_revenue,
        employee_count: tenant.employee_count,
        active: tenant.active,
        created_at: tenant.created_at,
        updated_at: tenant.updated_at,
        settings: tenant.settings,
        theme: tenant.theme,
        language: tenant.language,
        timezone: tenant.timezone
      },
      message: 'Tenant settings fetched successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      trace_id
    });
  }
});

// PUT /api/v1/tenants/:id
router.put('/:id', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { name, description, email, phone, website, logo_url, industry, annual_revenue, employee_count, active } = req.body;
    if (!name || !email) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'Name and email are required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const tenant = await Tenant.findOneAndUpdate(
      { id: req.params.id },
      { name, description, email, phone, website, logo_url, industry, annual_revenue, employee_count, active },
      { new: true }
    );
    if (!tenant) {
      return res.status(422).json({
        detail: [
          { loc: ['params', 'id'], msg: 'Tenant not found', type: 'not_found' }
        ],
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        id: tenant.id,
        name: tenant.name,
        description: tenant.description,
        email: tenant.email,
        phone: tenant.phone,
        website: tenant.website,
        logo_url: tenant.logo_url,
        industry: tenant.industry,
        annual_revenue: tenant.annual_revenue,
        employee_count: tenant.employee_count,
        active: tenant.active,
        created_at: tenant.created_at,
        updated_at: tenant.updated_at
      },
      message: 'Tenant updated successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      trace_id
    });
  }
});

// PUT /api/v1/tenants/:id/settings
router.put('/:id/settings', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { settings, theme, language, timezone } = req.body;
    // At least one field must be present
    if (!settings && !theme && !language && !timezone) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'At least one of settings, theme, language, or timezone is required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const update = {};
    if (settings !== undefined) update.settings = settings;
    if (theme !== undefined) update.theme = theme;
    if (language !== undefined) update.language = language;
    if (timezone !== undefined) update.timezone = timezone;
    const tenant = await Tenant.findOneAndUpdate(
      { id: req.params.id },
      update,
      { new: true }
    );
    if (!tenant) {
      return res.status(422).json({
        detail: [
          { loc: ['params', 'id'], msg: 'Tenant not found', type: 'not_found' }
        ],
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        settings: tenant.settings,
        theme: tenant.theme,
        language: tenant.language,
        timezone: tenant.timezone
      },
      message: 'Tenant settings updated successfully',
      trace_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      trace_id
    });
  }
});

module.exports = router; 