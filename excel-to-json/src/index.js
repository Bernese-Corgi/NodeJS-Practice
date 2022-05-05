const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use('/', routes);

// express 서버 띄우기
app.listen(port, () => {
  console.log('Express listening on port', port);
});
