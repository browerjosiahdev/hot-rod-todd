var express = require('express');
var app = express();

app.use(express.static("src"));

app.listen(80, function () {
    console.log('Express server started!!!');
});
