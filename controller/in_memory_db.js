const { v4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const db = new Map();

const dbCollectionNames = () => [...db.keys()];

function getCollection(req) {
  const collectionName = req.params.col?.trim();

  return _getCollection(collectionName);
}

function _getCollection(collectionName) {
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

const MAX_COUNT = 100;

function loadRandomData(req, res) {
  let { count = 10, model } = req.body;
  count = Math.min(count, MAX_COUNT);

  if (!model || !Object.keys(model)) {
    return res.sendStatus(400);
  }

  generateRandomData(count, model, req);

  return res.sendStatus(201);
}

function generateRandomData(count, model, req) {
  const generatedData = Array(count).fill().map(generateData);

  const collection = getCollection(req);
  collection.push(...generatedData);

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

function randomOfType(type) {
  switch (type) {
    case 'string':
      return faker.lorem.lines(1);
    case 'number':
      return faker.number.float({ min: 0, max: 299.99, precision: 0.01 });
    case 'date':
      return faker.date.between({ from: '2010-01-01', to: '2021-01-01' });
    case 'image':
      return faker.image.urlLoremFlickr({
        category: 'food',
      });
    case 'product-name':
      return faker.commerce.product();
    case 'category':
      return faker.commerce.department();
    default:
      return 'Type Not Supported';
  }
}

function seedRandomData() {
  generateRandomData(
    50,
    {
      nome: 'product-name',
      prezzo: 'number',
      categoria: 'category',
      urlImmagine: 'image',
    },
    { params: { col: 'prodotti' } }
  );
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
  seedRandomData,
};
