const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/recipe-book-pv'));

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname+'/recipe-book-pv/index.html'));
});

app.listen(process.env.PORT || 8080);
