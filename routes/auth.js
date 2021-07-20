const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../config');

const users = [
  { username: 'admin', password: 'admin', role: 'Admin' },
  { username: 'user', password: 'user', role: 'User' },
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const authenticatedUser = users.find(
    (user) => user.username === username && user.password == password
  );
  if (!authenticatedUser) {
    return res.status(401).send({ error: 'Bad Credentials' });
  }
  const accessToken = jwt.sign(authenticatedUser, accessTokenSecret);
  res.json({ accessToken });
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.some((user) => user.username === username)) {
    return res
      .status(409)
      .send({ error: 'User with the same username exists' });
  }
});

module.exports = router;
