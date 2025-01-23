const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// endpoint, middlewares(s)
app.get('/', function (req, res) {
    res.sendFile('index.html')
})

//now has "nodemon" page, create link to this page
app.get('/nodemon', function (req, res) {
    res.send('this is a working page')
})

app.get('/ejs', function (req, res) {
    res.render('words', {PageTitle: req.body.MyName});
})

app.get('/helloRender', function (req, res) {
    res.send('Hello from Real World<br><a href="/">return home<a>')
})
//uses POST method to get info from the dom
app.post('/saveMyName', function (req, res) {
    console.log('did we hit the endpoint?');
    console.log(req.body);
    res.redirect('/ejs');
})
//uses query from dom to get information
app.get('/saveMyNameGet', function (req, res) {
    console.log('did we hit the get endpoint?');
    console.log(req.query);
    res.redirect('/ejs');
})

app.listen(port, () => console.log(`server is running on ... ${port}`));

/*  
"npm i express"
"npm i body-parser"
"npm i ejs"
*/