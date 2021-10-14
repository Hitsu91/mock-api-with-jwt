const express = require('express');
const fs = require('fs');
const { getLogTrace } = require('../config/logging');
const router = express.Router();

const {
  flushAll,
  flushCollection,
  loadRandomData,
} = require('../controller/in_memory_db');

router.delete('/flush', flushAll);

router.delete('/flush/:col', flushCollection);

router.post('/load-random-data/:col', loadRandomData);

router.get('/logs', (req, res) => {
  res.send(getLogTrace());
});

router.get('/secret-logs', (req, res) => {
  fs.readFile(`/${__dirname}/../logs.txt`, (err, data) => {
    if (err) {
      res.status(500).send({ msg: 'Cannot read file', err });
    }
    res.send(data);
  });
});

router.get('/flush-logs', (req, res) => {
  fs.truncate(`/${__dirname}/../logs.txt`, 0, (err) => {
    if (err) {
      res.send({ status: 'failed', err });
    }
    res.send({ status: 'done' });
  });
});

module.exports = router;
