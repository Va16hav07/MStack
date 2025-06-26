const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const tenantRoutes = require('./routes/tenants');
const organizationRoutes = require('./routes/organizations');
const usersRoutes = require('./routes/users');
const rolesRoutes = require('./routes/roles');
const privilegesRoutes = require('./routes/privileges');
const legalEntitiesRoutes = require('./routes/legalEntities');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tenants', tenantRoutes);
app.use('/api/v1/tenants/:tenant_id/organizations', organizationRoutes);
app.use('/api/v1/tenants/:tenant_id/users', usersRoutes);
app.use('/api/v1/tenants/:tenant_id/roles', rolesRoutes);
app.use('/api/v1/tenants/:tenant_id/privileges', privilegesRoutes);
app.use('/api/v1/tenants/:tenant_id/legal-entities', legalEntitiesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 