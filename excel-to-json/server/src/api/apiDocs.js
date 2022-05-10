const { Router } = require('express');
const express = require('express');
const XLSX = require('xlsx');

const apiDocs = Router();

apiDocs.get('/', (req, res, mext) => {
  const excelFile = XLSX.readFile(__dirname + '/../../public/_ApiDocs.xlsx');
  const { SheetNames, Sheets } = excelFile;

  // 참조 스타일 등 셀의 모든 정보를 같이 가져온다.
  const workSheet = Sheets[SheetNames[0]];
  // res.send(workSheet);

  // 셀의 내용만 가져온다.
  const jsonData = XLSX.utils.sheet_to_json(workSheet);
  res.send(jsonData);
});

module.exports = apiDocs;
