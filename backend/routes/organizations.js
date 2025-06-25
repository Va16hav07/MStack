const express = require('express');
const router = express.Router({ mergeParams: true });
const { v4: uuidv4 } = require('uuid');
const Organization = require('../models/Organization');

// GET /api/v1/tenants/:tenant_id/organizations
router.get('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    if (!tenant_id) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'BadRequest',
          message: 'tenant_id is required in path',
          details: {}
        },
        trace_id
      });
    }
    const { name, industry, active, page = 1, page_size = 10 } = req.query;
    const filter = { tenant_id };
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (industry) filter.industry = industry;
    if (active !== undefined) filter.active = active === 'true';
    const skip = (parseInt(page) - 1) * parseInt(page_size);
    const organizations = await Organization.find(filter)
      .skip(skip)
      .limit(Math.min(parseInt(page_size), 100));
    res.json({
      success: true,
      data: organizations.map(org => ({
        id: org.id,
        tenant_id: org.tenant_id,
        name: org.name,
        description: org.description,
        organization_type: org.organization_type,
        email: org.email,
        phone: org.phone,
        website: org.website,
        logo_url: org.logo_url,
        industry: org.industry,
        annual_revenue: org.annual_revenue,
        employee_count: org.employee_count,
        active: org.active,
        organization_profile: org.organization_profile,
        created_at: org.created_at,
        updated_at: org.updated_at
      })),
      message: 'Organizations fetched successfully',
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

// POST /api/v1/tenants/:tenant_id/organizations
router.post('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    if (!tenant_id) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'BadRequest',
          message: 'tenant_id is required in path',
          details: {}
        },
        trace_id
      });
    }
    const { name, description, organization_type, email, phone, website, logo_url, industry, annual_revenue, employee_count, organization_profile } = req.body;
    if (!name || !email || !organization_type) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'Name, email, and organization_type are required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const org = await Organization.create({
      tenant_id, name, description, organization_type, email, phone, website, logo_url, industry, annual_revenue, employee_count, organization_profile
    });
    res.status(201).json({
      success: true,
      data: {
        id: org.id,
        tenant_id: org.tenant_id,
        name: org.name,
        description: org.description,
        organization_type: org.organization_type,
        email: org.email,
        phone: org.phone,
        website: org.website,
        logo_url: org.logo_url,
        industry: org.industry,
        annual_revenue: org.annual_revenue,
        employee_count: org.employee_count,
        active: org.active,
        organization_profile: org.organization_profile,
        created_at: org.created_at,
        updated_at: org.updated_at
      },
      message: 'Organization created successfully',
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

// GET /api/v1/tenants/:tenant_id/organizations/:id
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
    const org = await Organization.findOne({ tenant_id, id });
    if (!org) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Organization not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        id: org.id,
        tenant_id: org.tenant_id,
        name: org.name,
        description: org.description,
        organization_type: org.organization_type,
        email: org.email,
        phone: org.phone,
        website: org.website,
        logo_url: org.logo_url,
        industry: org.industry,
        annual_revenue: org.annual_revenue,
        employee_count: org.employee_count,
        active: org.active,
        organization_profile: org.organization_profile,
        created_at: org.created_at,
        updated_at: org.updated_at
      },
      message: 'Organization fetched successfully',
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

// PUT /api/v1/tenants/:tenant_id/organizations/:id
router.put('/:id', async (req, res) => {
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
    const { name, description, organization_type, email, phone, website, logo_url, industry, annual_revenue, employee_count, active, organization_profile } = req.body;
    if (!name || !email || !organization_type) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'Name, email, and organization_type are required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const org = await Organization.findOneAndUpdate(
      { tenant_id, id },
      { name, description, organization_type, email, phone, website, logo_url, industry, annual_revenue, employee_count, active, organization_profile },
      { new: true }
    );
    if (!org) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Organization not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        id: org.id,
        tenant_id: org.tenant_id,
        name: org.name,
        description: org.description,
        organization_type: org.organization_type,
        email: org.email,
        phone: org.phone,
        website: org.website,
        logo_url: org.logo_url,
        industry: org.industry,
        annual_revenue: org.annual_revenue,
        employee_count: org.employee_count,
        active: org.active,
        organization_profile: org.organization_profile,
        created_at: org.created_at,
        updated_at: org.updated_at
      },
      message: 'Organization updated successfully',
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

// DELETE /api/v1/tenants/:tenant_id/organizations/:id
router.delete('/:id', async (req, res) => {
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
    const org = await Organization.findOneAndUpdate(
      { tenant_id, id },
      { active: false },
      { new: true }
    );
    if (!org) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Organization not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: `Organization ${id} soft deleted`,
      message: 'Organization deleted successfully',
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

// GET /api/v1/tenants/:tenant_id/organizations/:id/profile
router.get('/:id/profile', async (req, res) => {
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
    const org = await Organization.findOne({ tenant_id, id });
    if (!org) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Organization not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        organization_profile: org.organization_profile
      },
      message: 'Organization profile fetched successfully',
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

// PUT /api/v1/tenants/:tenant_id/organizations/:id/profile
router.put('/:id/profile', async (req, res) => {
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
    const { name, description, email, phone, website, logo_url, industry, annual_revenue, employee_count } = req.body;
    if (!name || !email) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'Name and email are required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const update = { name, description, email, phone, website, logo_url, industry, annual_revenue, employee_count };
    const org = await Organization.findOneAndUpdate(
      { tenant_id, id },
      update,
      { new: true }
    );
    if (!org) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Organization not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        id: org.id,
        tenant_id: org.tenant_id,
        name: org.name,
        description: org.description,
        organization_type: org.organization_type,
        email: org.email,
        phone: org.phone,
        website: org.website,
        logo_url: org.logo_url,
        industry: org.industry,
        annual_revenue: org.annual_revenue,
        employee_count: org.employee_count,
        active: org.active,
        organization_profile: org.organization_profile,
        created_at: org.created_at,
        updated_at: org.updated_at
      },
      message: 'Organization profile updated successfully',
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
