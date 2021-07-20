const express = require('express');
const { getLogTrace } = require('../config/logging');
const router = express.Router();

const { flushAll, flushCollection } = require('../controller/in_memory_db');

router.delete('/flush', flushAll);

router.delete('/flush/:col', flushCollection);

router.get('/logs', (req, res) => {
  res.send(getLogTrace());
});

module.exports = router;
