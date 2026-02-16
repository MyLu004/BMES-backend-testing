const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'dev' });
});

app.post('/v1/ingest', (req, res) => {
  const body = req.body || {};

  if (!body.deviceId || !body.patientId || !body.timestamp || !body.measurements) {
    return res.status(400).json({ ok: false, reason: 'missing required fields' });
  }

  res.json({
    ok: true,
    ingestId: `ingest-${Date.now()}`,
    received: body
  });
});

const port = process.env.PORT || 3000;

if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
  });
}

module.exports.handler = serverless(app);
