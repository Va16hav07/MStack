const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  const trace_id = uuidv4();
  try {
    const { email, password, tenant_id } = req.body;
    if (!email || !password || !tenant_id) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'Email, password, and tenant_id are required', type: 'validation_error' }
        ],
        trace_id
      });
    }

    const user = await User.findOne({ email, tenant_id });
    if (!user) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'Invalid credentials', type: 'authentication_error' }
        ],
        trace_id
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(422).json({
        detail: [
          { loc: ['body'], msg: 'Invalid credentials', type: 'authentication_error' }
        ],
        trace_id
      });
    }

    // Generate tokens
    const payload = {
      user_id: user.user_id,
      email: user.email,
      tenant_id: user.tenant_id,
      organization_id: user.organization_id,
    };
    const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        access_token,
        refresh_token,
        token_type: 'bearer',
        name: user.name,
        email: user.email,
        user_id: user.user_id,
        tenant_id: user.tenant_id,
        organization_id: user.organization_id,
        tenant_region_url: user.tenant_region_url || '',
      },
      message: 'Login successful',
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