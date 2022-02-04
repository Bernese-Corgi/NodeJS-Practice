const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hello express');
});

// 주소 띄우기
app.get('/jin', (req, res) => {
  res.send('jin get');
});

// express 서버 띄우기
app.listen(port, () => {
  console.log('Express listening on port', port);
});
