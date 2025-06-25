// ... existing code ...
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
    const { organization_profile } = req.body;
    if (organization_profile === undefined) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'organization_profile is required', type: 'validation_error' }
        ],
        trace_id
      });
    }
    const org = await Organization.findOneAndUpdate(
      { tenant_id, id },
      { organization_profile },
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
        organization_profile: org.organization_profile
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
// ... existing code ...