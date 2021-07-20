const express = require('express');
const router = express.Router();

router.get('/', (_, res) =>
  res.send({
    endpoints: [
      {
        endpoint: '/api/v1',
        description: 'Api without authentication',
        paths: ['/**'],
      },
      {
        endpoint: '/api/v2',
        description: 'Api with authentication',
        paths: ['/**'],
      },
      {
        endpoint: '/auth',
        description: 'Api with authentication',
        paths: ['/login', '/signup'],
      },
      {
        endpoint: '/admin',
        description: 'Manage mock apis',
        paths: ['/logs', '/flush', '/flush/:collection'],
      },
    ],
  })
);

module.exports = router;
