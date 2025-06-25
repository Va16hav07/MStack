const express = require('express');
const router = express.Router({ mergeParams: true });
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Role = require('../models/Role');

// GET /api/v1/tenants/:tenant_id/users
router.get('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    const { email, first_name, last_name, organization_id, page = 1, page_size = 10 } = req.query;
    const filter = { tenant_id };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (first_name) filter.first_name = { $regex: first_name, $options: 'i' };
    if (last_name) filter.last_name = { $regex: last_name, $options: 'i' };
    if (organization_id) filter.organization_id = organization_id;
    const skip = (parseInt(page) - 1) * parseInt(page_size);
    const users = await User.find(filter).skip(skip).limit(Math.min(parseInt(page_size), 100));
    res.json({
      success: true,
      data: users.map(user => ({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id,
        tenant_id: user.tenant_id,
        organization_id: user.organization_id,
        active: user.active,
        created_at: user.created_at,
        updated_at: user.updated_at,
        roles: user.roles || []
      })),
      message: 'Users fetched successfully',
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

// POST /api/v1/tenants/:tenant_id/users
router.post('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    const { email, first_name, last_name, password, organization_id } = req.body;
    if (!email || !first_name || !last_name || !password || !tenant_id) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'email, first_name, last_name, password, and tenant_id are required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const existing = await User.findOne({ email, tenant_id });
    if (existing) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'User with this email already exists in tenant', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, first_name, last_name, passwordHash, tenant_id, organization_id
    });
    res.status(201).json({
      success: true,
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id,
        tenant_id: user.tenant_id,
        organization_id: user.organization_id,
        active: user.active,
        created_at: user.created_at,
        updated_at: user.updated_at,
        roles: user.roles || []
      },
      message: 'User created successfully',
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

// GET /api/v1/tenants/:tenant_id/users/:id
router.get('/:id', async (req, res) => { res.status(501).json({ message: 'Not implemented' }); });

// PUT /api/v1/tenants/:tenant_id/users/:id
router.put('/:id', async (req, res) => { res.status(501).json({ message: 'Not implemented' }); });

// GET /api/v1/tenants/:tenant_id/users/:id/roles
router.get('/:id/roles', async (req, res) => { res.status(501).json({ message: 'Not implemented' }); });

// POST /api/v1/tenants/:tenant_id/users/:id/roles
router.post('/:id/roles', async (req, res) => { res.status(501).json({ message: 'Not implemented' }); });

// DELETE /api/v1/tenants/:tenant_id/users/:id/roles/:role_id
router.delete('/:id/roles/:role_id', async (req, res) => { res.status(501).json({ message: 'Not implemented' }); });

// GET /api/v1/me
router.get('/me', async (req, res) => { res.status(501).json({ message: 'Not implemented' }); });

// PUT /api/v1/me
router.put('/me', async (req, res) => { res.status(501).json({ message: 'Not implemented' }); });

module.exports = router; 