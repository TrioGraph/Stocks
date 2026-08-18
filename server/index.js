const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const allowedOrigins = ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'X-UserType',
    'X-SourceID',
    'X-ClientLocalIP',
    'X-ClientPublicIP',
    'X-MACAddress',
    'X-PrivateKey',
  ],
}));
app.options('*', cors());
app.use(express.json());

function buildForwardHeaders(req) {
  const headers = { ...req.headers };
  // Remove headers that should not be forwarded
  delete headers.host;
  delete headers.connection;
  delete headers['content-length'];
  return headers;
}

async function forward(req, res, targetUrl, method = 'post') {
  try {
    const headers = buildForwardHeaders(req);
    const axiosConfig = {
      method: method,
      url: targetUrl,
      headers,
      data: req.body,
      params: req.query,
      timeout: 20000,
    };
    const response = await axios(axiosConfig);
    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}

// Auth endpoints
app.post('/api/login', (req, res) => {
  return forward(req, res, 'https://apiconnect.angelone.in/rest/auth/angelbroking/user/v1/loginByPassword', 'post');
});

app.post('/api/generateTokens', (req, res) => {
  return forward(req, res, 'https://apiconnect.angelone.in/rest/auth/angelbroking/jwt/v1/generateTokens', 'post');
});

app.get('/api/getProfile', (req, res) => {
  return forward(req, res, 'https://apiconnect.angelone.in/rest/secure/angelbroking/user/v1/getProfile', 'get');
});

// Market / order endpoints
app.post('/api/getLtpData', (req, res) => {
  return forward(req, res, 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/getLtpData', 'post');
});

app.post('/api/quote', (req, res) => {
  return forward(req, res, 'https://apiconnect.angelone.in/rest/secure/angelbroking/market/v1/quote/', 'post');
});

app.post('/api/getCandleData', (req, res) => {
  return forward(req, res, 'https://apiconnect.angelone.in/rest/secure/angelbroking/historical/v1/getCandleData', 'post');
});

app.post('/api/placeorder', (req, res) => {
  return forward(req, res, 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/placeorder/', 'post');
});

// File API proxy
app.get('/api/fileapi', (req, res) => {
  return forward(req, res, 'https://triograph.com/fileapi/api.php', 'get');
});
app.post('/api/fileapi', (req, res) => {
  return forward(req, res, 'https://triograph.com/fileapi/api.php', 'post');
});

// Fallback
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Unknown API route' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Stocks API proxy listening on port ${port}`));
