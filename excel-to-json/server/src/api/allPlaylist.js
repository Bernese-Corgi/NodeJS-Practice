const { Router, json } = require('express');
const XLSX = require('xlsx');

const allPlaylist = Router();

allPlaylist.get('/', (req, res, next) => {
  const LIMIT = 10;
  const page = parseInt(req.query.page || 1, 10); // 값이 주어지지 않았다면 1을 사용

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const excelFile = XLSX.readFile(__dirname + '/../../public/AllPlaylist.xlsx');
  const { SheetNames, Sheets } = excelFile;

  const workSheet = Sheets[SheetNames[0]];

  const jsonData = XLSX.utils
    .sheet_to_json(workSheet)
    .splice(LIMIT * (page - 1), LIMIT * page);

  res.send(jsonData);
});

module.exports = allPlaylist;
