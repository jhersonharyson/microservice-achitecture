const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post('/events', async(req, res) => {
    console.log(req.body)
    axios.post('http://localhost:4000/events', req.body)
    axios.post('http://localhost:4001/events', req.body)
    axios.post('http://localhost:4002/events', req.body)
    axios.post('http://localhost:4003/events', req.body)
    res.send({
        status: 'Ok'
    })
})
app.get('/events', (req, res) => {
    console.log('GET /events', req.body.type)
    console.log('Recive Event', req.body.type)
    console.log('Origin', req.body.origin)

    res.send('Hello')
})
app.listen(4005, () => {
    console.log('Event-Bus Microservice')
    console.log('Server is runnig on 4005')
})