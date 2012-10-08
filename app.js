var express = require('express'), jade = require('jade');
var app = express();

var fs = require('fs');
var items;
var itemsPerPage = 2;
var maxPages = 0;
fs.readFile('views/partials/items.json', 'utf8', function(error, data) {
    items = JSON.parse(data);
    maxPages = items.length / itemsPerPage; 
});

var pub = __dirname + '/public';

app.use(app.router);
app.use(express.static(pub));
app.use(express.errorHandler());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index.jade', {
        pageTitle: 'Test',
        items: items.slice(0, 2),
        maxPages: maxPages,
        layout: true
    });
});

app.get('/page/:page', function(req, res) {
    var page = req.params.page;
    var start = (page - 1) * 2;
    var end = page * 2;

    res.render('partials/items.jade', {
        pageTitle: 'Test',
        items: items.slice(start, end),
        layout: false
    });
});

app.listen(8000);