const express = require('express');

const admin = require('./routes/admin');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/admin', admin);

// express 서버 띄우기
app.listen(port, () => {
  console.log('Express listening on port', port);
});
