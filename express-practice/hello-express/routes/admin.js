const express = require('express');
const router = express.Router();

// GET /admin
router.get('/', (req, res) => {
  res.send('admin 이후 url');
});

// GET /admin/products
router.get('/producs', (req, res) => {
  res.send('admin products');
});

// router를 내보낸다.
module.exports = router;
