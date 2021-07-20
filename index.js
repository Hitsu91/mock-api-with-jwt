const express = require('express');
const cors = require('cors');

const app = express();

const authenticateToken = require('./middleware/auth_middleware');
const mockApiRoute = require('./routes/mock-api');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const apiRoute = require('./routes/api');
const loggingMiddleWare = require('./middleware/logger_middleware');

app.use(express.json());
app.use(cors());
app.use(loggingMiddleWare);

app.use('/', apiRoute);
app.use('/auth', authRoute);
app.use('/api/v1', mockApiRoute);
app.use('/api/v2', authenticateToken, mockApiRoute);
app.use('/admin', adminRoute);

app.use((req, res) => {
  res.status(404).send({ error: 'Not Valid Endpoint' });
});

app.listen(process.env.PORT || 5000);
