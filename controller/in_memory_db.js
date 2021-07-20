const { v4 } = require('uuid');
const db = new Map();

function getCollection(req) {
  const collectionName = req.params.col;
  let collection = db.get(collectionName);
  if (!collection) {
    db.set(collectionName, []);
    collection = db.get(collectionName);
  }
  return collection;
}

function getDBs(_, res) {
  res.send({ dbs: [...db.keys()] });
}

function getAll(req, res) {
  res.send(getCollection(req));
}

function getOne(req, res) {
  const collection = getCollection(req);
  const id = req.params.id;

  let index = collection.findIndex((v) => v.id === id);
  if (index === -1) {
    res.status(404).send({ error: 'Resource not found' });
  }

  res.send(collection[index]);
}

function add(req, res) {
  const data = req.body;
  if (!data) {
    return res.status(403).send({ error: 'Should provide data' });
  }

  const collection = getCollection(req);

  data.id = v4();
  collection.push(data);
  res.send(data);
}

function remove(req, res) {
  const collection = getCollection(req);
  const id = req.params.id;

  let index = collection.findIndex((v) => v.id === id);
  if (index === -1) {
    res.status(404).send({ error: 'Resource not found' });
  }

  let removed = collection.splice(index, 1);

  res.send(removed);
}

function update(req, res) {
  const data = req.body;
  if (!data) {
    return res.status(403).send({ error: 'Should provide data' });
  }

  const collection = getCollection(req);
  const id = req.params.id;

  let index = collection.findIndex((v) => v.id === id);
  if (index === -1) {
    res.status(404).send({ error: 'Resource not found' });
  }

  data.id = id;

  collection[index] = data;
  res.send(data);
}

function flushCollection(req, res) {
  const collectionName = req.params.col;
  db.delete(collectionName);
  res.sendStatus(200);
}

function flushAll(req, res) {
  db.clear();
  res.sendStatus(200);
}

module.exports = {
  getAll,
  getDBs,
  getOne,
  add,
  remove,
  update,
  flushAll,
  flushCollection,
};
