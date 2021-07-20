const express = require('express');
const router = express.Router();

const {
  getAll,
  getDBs,
  getOne,
  add,
  remove,
  update,
} = require('../controller/in_memory_db');

router.get('/', getDBs);

router.get('/:col', getAll);

router.get('/:col/:id', getOne);

router.post('/:col', add);

router.delete('/:col/:id', remove);

router.put('/:col/:id', update);

module.exports = router;
