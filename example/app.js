const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const cors = require('cors')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/example', (req, res) => {
   console.log("request example")
   res.send("GET success")
});

app.post('/example', (req, res) => {
    console.log("request example")
    res.send("POST success")
 });

app.listen(5000, () => {
    console.log('Example Microservice');
    console.log('Example server listening on port 5000!');
});