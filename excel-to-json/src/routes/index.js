const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');

router.get('/excel', (req, res, mext) => {
  let workbook = XLSX.readFile(__dirname + '/../../public/ApiDocs.xlsx');
  let worksheet = workbook.Sheets['Sheet1'];
  res.json(worksheet);
});

module.exports = router;
