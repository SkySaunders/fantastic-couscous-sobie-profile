const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))

// endpoint, middlewares(s)
app.get('/', function (req, res) {
    res.sendFile('index.html')
})

//now has "nodemon" page, create link to this page
app.get('/nodemon', function (req, res) {
    res.send('this is a working page')
})

app.get('/helloRender', function (req, res){
    res.send('Hello from Real World<br><a href="/">return home<a>')
})
app.listen(port, ()=> console.log(`server is running on ... ${port}`));

// when running run "npm i express" prior to running the code