const { v4 } = require('uuid');
const faker = require('faker');
const db = new Map();

const dbCollectionNames = () => [...db.keys()];

function getCollection(req) {
  const collectionName = req.params.col?.trim();

  if (!db.has(collectionName)) {
    db.set(collectionName, []);
  }
  return db.get(collectionName);
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

  if (!data || Object.keys(data) == 0) {
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
  if (!data || Object.keys(data) == 0) {
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
  const collectionName = req.params.col?.trim();
  db.delete(collectionName);
  res.sendStatus(200);
}

function flushAll(req, res) {
  db.clear();
  res.sendStatus(200);
}

function randomOfType(type) {
  switch (type) {
    case 'string':
      return faker.lorem.lines(1);
    case 'number':
      return faker.datatype.number(100);
    case 'date':
      return faker.date.between('2010-01-01', '2021-01-01');
    case 'image':
      return faker.image.avatar();
    default:
      return 'Type Not Supported';
  }
}

const MAX_COUNT = 100;

function loadRandomData(req, res) {
  let { count = 10, model } = req.body;
  count = Math.min(count, MAX_COUNT);

  if (!model || !Object.keys(model)) {
    return res.sendStatus(400);
  }

  const generatedData = Array(count).fill().map(generateData);

  const collection = getCollection(req);
  collection.push(...generatedData);
  return res.sendStatus(201);

  function generateData() {
    let res = {
      id: v4(),
    };

    for (const k in model) {
      res[k] = randomOfType(model[k]);
    }

    return res;
  }
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
  loadRandomData,
  dbCollectionNames,
};
