var path = require('path');

var express = require('express');

var exphbs  = require('express-handlebars');


//express
var app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// Set view path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});
// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public')));

//port
var port = 9002;
app.listen(port);

console.log('Server is Up and Running at Port : ' + port);
