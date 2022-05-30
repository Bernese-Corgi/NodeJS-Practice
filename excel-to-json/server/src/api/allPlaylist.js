const { Router } = require('express');
const XLSX = require('xlsx');

const allPlaylist = Router();

allPlaylist.get('/', (req, res, next) => {
  const excelFile = XLSX.readFile(__dirname + '/../../public/AllPlaylist.xlsx');
  const { SheetNames, Sheets } = excelFile;

  const workSheet = Sheets[SheetNames[0]];

  const jsonData = XLSX.utils.sheet_to_json(workSheet);
  res.send(jsonData);
});

module.exports = allPlaylist;
