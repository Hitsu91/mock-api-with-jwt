const express = require('express');
const router = express.Router();
const { dbCollectionNames } = require('../controller/in_memory_db');

router.get('/', (_, res) => {
  const apiPath = dbCollectionNames().map((c) => `/${c}`);
  return res.send({
    endpoints: [
      {
        endpoint: '/api/v1',
        description: 'Api without authentication',
        paths: ['/**', ...apiPath],
      },
      {
        endpoint: '/api/v2',
        description: 'Api with authentication',
        paths: ['/**', ...apiPath],
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
  });
});

module.exports = router;
