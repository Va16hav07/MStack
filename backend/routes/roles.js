const express = require('express');
const router = express.Router({ mergeParams: true });
const { v4: uuidv4 } = require('uuid');
const Role = require('../models/Role');

// GET /api/v1/tenants/:tenant_id/roles
router.get('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    const { name, organization_id, page = 1, page_size = 10 } = req.query;
    const filter = { tenant_id };
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (organization_id) filter.organization_id = organization_id;
    const skip = (parseInt(page) - 1) * parseInt(page_size);
    const roles = await Role.find(filter).skip(skip).limit(Math.min(parseInt(page_size), 100));
    res.json({
      success: true,
      data: roles.map(role => ({
        name: role.name,
        description: role.description,
        id: role.id,
        tenant_id: role.tenant_id,
        active: role.active,
        is_system_role: role.is_system_role,
        created_at: role.created_at,
        updated_at: role.updated_at,
        privileges: role.privileges || []
      })),
      message: 'Roles fetched successfully',
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

// POST /api/v1/tenants/:tenant_id/roles
router.post('/', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id } = req.params;
    const { name, description, is_system_role, permission_ids } = req.body;
    if (!name || !tenant_id) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'name and tenant_id are required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const role = await Role.create({
      name,
      description,
      tenant_id,
      is_system_role: !!is_system_role,
      privileges: permission_ids || []
    });
    res.status(201).json({
      success: true,
      data: {
        name: role.name,
        description: role.description,
        id: role.id,
        tenant_id: role.tenant_id,
        active: role.active,
        is_system_role: role.is_system_role,
        created_at: role.created_at,
        updated_at: role.updated_at,
        privileges: role.privileges || []
      },
      message: 'Role created successfully',
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

// GET /api/v1/tenants/:tenant_id/roles/:id
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
    const role = await Role.findOne({ tenant_id, id });
    if (!role) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Role not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        name: role.name,
        description: role.description,
        id: role.id,
        tenant_id: role.tenant_id,
        active: role.active,
        is_system_role: role.is_system_role,
        created_at: role.created_at,
        updated_at: role.updated_at,
        privileges: role.privileges || []
      },
      message: 'Role fetched successfully',
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

// PUT /api/v1/tenants/:tenant_id/roles/:id
router.put('/:id', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id, id } = req.params;
    const { description, active, permission_ids } = req.body;
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
    const update = {};
    if (description !== undefined) update.description = description;
    if (active !== undefined) update.active = active;
    if (permission_ids !== undefined) update.privileges = permission_ids;
    const role = await Role.findOneAndUpdate(
      { tenant_id, id },
      update,
      { new: true }
    );
    if (!role) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Role not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: {
        name: role.name,
        description: role.description,
        id: role.id,
        tenant_id: role.tenant_id,
        active: role.active,
        is_system_role: role.is_system_role,
        created_at: role.created_at,
        updated_at: role.updated_at,
        privileges: role.privileges || []
      },
      message: 'Role updated successfully',
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

// POST /api/v1/tenants/:tenant_id/roles/:role_id/privileges/:privilege_id/link
router.post('/:role_id/privileges/:privilege_id/link', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id, role_id, privilege_id } = req.params;
    if (!tenant_id || !role_id || !privilege_id) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'BadRequest',
          message: 'tenant_id, role_id, and privilege_id are required in path',
          details: {}
        },
        trace_id
      });
    }
    const role = await Role.findOneAndUpdate(
      { tenant_id, id: role_id },
      { $addToSet: { privileges: privilege_id } },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Role not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: role,
      message: 'Privilege linked to role successfully',
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

// POST /api/v1/tenants/:tenant_id/roles/:role_id/privileges/:privilege_id/unlink
router.post('/:role_id/privileges/:privilege_id/unlink', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { tenant_id, role_id, privilege_id } = req.params;
    if (!tenant_id || !role_id || !privilege_id) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'BadRequest',
          message: 'tenant_id, role_id, and privilege_id are required in path',
          details: {}
        },
        trace_id
      });
    }
    const role = await Role.findOneAndUpdate(
      { tenant_id, id: role_id },
      { $pull: { privileges: privilege_id } },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NotFound',
          message: 'Role not found',
          details: {}
        },
        trace_id
      });
    }
    res.json({
      success: true,
      data: role,
      message: 'Privilege unlinked from role successfully',
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