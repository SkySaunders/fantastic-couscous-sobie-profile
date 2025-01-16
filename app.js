const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

// endpoint, middlewares(s)
app.get('/', function (req, res) {
    res.send('Hello Express')
})

app.listen(port, ()=> console.log(`server is running on ... ${port}`));

// when running run "npm i express" prior to running the code