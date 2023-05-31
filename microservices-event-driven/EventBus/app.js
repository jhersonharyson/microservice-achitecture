const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const amqplib = require('amqplib');


const eventBus = "event-bus"
let connection = null;
let channel = null;

const queueConnection = async () => {
    connection = await amqplib.connect('amqps://wondrzpu:f863xo5nI1WSdOrlUEZQIEleQi88vdgs@armadillo.rmq.cloudamqp.com/wondrzpu');
    channel = await connection.createChannel();
    await channel.assertQueue(eventBus);

    channel.consume(eventBus, (msg) => {
        console.log("asdasdasdad ********************************")
        channel.sendToQueue('posts', msg.content)
        channel.sendToQueue('comments', msg.content)
        channel.sendToQueue('moderations', msg.content)
        channel.sendToQueue('query', msg.content)
      });
    

}

app.get('/events', (req, res) => {
    console.log('GET /events', req.body.type)
    console.log('Recive Event', req.body.type)
    console.log('Origin', req.body.origin)

    res.send('Hello')
})
app.listen(4005, async () => {
    await queueConnection();
    console.log('Event-Bus Microservice')
    console.log('Server is runnig on 4005')
})