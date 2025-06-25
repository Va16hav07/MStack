const express = require('express');
const router = express.Router({ mergeParams: true });
const { v4: uuidv4 } = require('uuid');
const Privilege = require('../models/Privilege');

// GET /api/v1/tenants/:tenant_id/privileges
router.get('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    const { name, page = 1, page_size = 10 } = req.query;
    const filter = { tenant_id };
    if (name) filter.name = { $regex: name, $options: 'i' };
    const skip = (parseInt(page) - 1) * parseInt(page_size);
    const privileges = await Privilege.find(filter).skip(skip).limit(Math.min(parseInt(page_size), 100));
    res.json({
      success: true,
      data: privileges.map(priv => ({
        name: priv.name,
        description: priv.description,
        active: priv.active,
        resource: priv.resource,
        id: priv.id,
        tenant_id: priv.tenant_id,
        created_at: priv.created_at,
        updated_at: priv.updated_at
      })),
      message: 'Privileges fetched successfully',
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

// POST /api/v1/tenants/:tenant_id/privileges
router.post('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    const { name, description, active, resource } = req.body;
    if (!name || !resource || !tenant_id) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'name, resource, and tenant_id are required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const privilege = await Privilege.create({
      name,
      description,
      active: active !== undefined ? active : true,
      resource,
      tenant_id
    });
    res.status(201).json({
      success: true,
      data: {
        name: privilege.name,
        description: privilege.description,
        active: privilege.active,
        resource: privilege.resource,
        id: privilege.id,
        tenant_id: privilege.tenant_id,
        created_at: privilege.created_at,
        updated_at: privilege.updated_at
      },
      message: 'Privilege created successfully',
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

// GET /api/v1/tenants/:tenant_id/privileges/:id
router.get('/:id', async (req, res) => { res.status(501).json({ message: 'Not implemented' }); });

// PUT /api/v1/tenants/:tenant_id/privileges/:id
router.put('/:id', async (req, res) => { res.status(501).json({ message: 'Not implemented' }); });

module.exports = router; 