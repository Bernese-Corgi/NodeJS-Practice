const express = require('express');
const api = require('./api');

const app = express();
const port = 4000;

app.use('/api', api);

// express 서버 띄우기
app.listen(port, () => {
  console.log('Express listening on port', port);
});
