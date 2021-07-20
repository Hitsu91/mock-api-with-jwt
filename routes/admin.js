const express = require('express');
const router = express.Router();

const { flushAll, flushCollection } = require('../controller/in_memory_db');

router.delete('/flush', flushAll);

router.delete('/flush/:col', flushCollection);

module.exports = router;
