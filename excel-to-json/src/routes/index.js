const express = require('express');
const router = express.Router();
const parseXlsx = require('excel'); //

// Excel 파일을 파싱하는 라우터 함수 (excel 모듈 사용)
router.get('/excelShow', function (req, res, next) {
  // 엑셀 파일이 있는 경로를 전달해 엑셀을 읽고, 그 데이터를 json으로 응답한다.
  parseXlsx(__dirname + '../../public/nodeexcel.xlsx', function (err, data) {
    res.json(data);
  });
});

module.exports = router;
