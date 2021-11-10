// server.js
// where your node app starts

// require dotenv module
require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', function(req, res) {
  if(req.params.date) {
    const { date } = req.params;
    const dateParsed = new Date(date).getTime() || new Date(parseInt(date)).getTime();

    if(isNaN(dateParsed)) {
      res.status(400).json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: dateParsed,
        utc: new Date(dateParsed).toUTCString()
      });
    }
  } else {
    res.json({ unix: Date.now(), utc: new Date().toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
