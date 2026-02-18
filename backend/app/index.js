// app.js or src/app.js
const express = require("express");
const app = express();

app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/api/v1/ingest", (req, res) => {
  const body = req.body;

  // Minimal validation (tweak to your schema)
  if (!body || !body.deviceId || !body.timestamp || !body.readings) {
    console.log("INGEST_REJECTED", {
      reason: "missing required fields",
      receivedAt: new Date().toISOString(),
      bodyPreview: body ? Object.keys(body) : null,
    });
    return res.status(400).json({
      ok: false,
      error: "Missing required fields: deviceId, timestamp, readings",
    });
  }

  // Log receipt (CloudWatch will capture this in AWS)
  console.log("INGEST_RECEIVED", {
    receivedAt: new Date().toISOString(),
    deviceId: body.deviceId,
    timestamp: body.timestamp,
    readingsKeys: Object.keys(body.readings || {}),
  });

  // Optional: log full payload for early dev (later you may reduce it)
  console.log("INGEST_PAYLOAD", body);

  return res.json({
    ok: true,
    message: "Packet received",
    receivedAt: new Date().toISOString(),
  });
});

module.exports = app;
