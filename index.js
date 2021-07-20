const express = require('express');
const app = express();
const mockApi = require('./routes/mock-api');

app.use(express.json());

app.get('/', (_, res) => res.send({ apiUrls: ['/api/v1'] }));

app.use('/api/v1', mockApi);

app.use((req, res) => {
  res.status(404).send({ error: 'Not Valid Endpoint' });
});

app.listen(process.env.PORT || 5000);
