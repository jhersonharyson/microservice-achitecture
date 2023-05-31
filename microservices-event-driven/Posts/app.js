const express = require('express')
const { randomBytes } = require('crypto')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const amqplib = require('amqplib');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const eventBus = "event-bus"
let connection = null;
let channel = null;

const queueConnection = async () => {
    connection = await amqplib.connect('amqps://wondrzpu:f863xo5nI1WSdOrlUEZQIEleQi88vdgs@armadillo.rmq.cloudamqp.com/wondrzpu');
    channel = await connection.createChannel();
}

const posts = {};
app.get('/posts', (req, res) => {
    return res.json(posts);
});

app.post('/posts', async (req, res) => {
    console.log('received post')
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { title, id }

    const data = {
        type: "Created Posts",
        data: {
            id: id,
            title: title
        }
    }
    await channel.sendToQueue(eventBus, Buffer.from(JSON.stringify(data)));

    console.log("created posts")
    return res.status(201).json(posts[id])

});


app.listen(4000, async () => {
    await queueConnection();
    console.log("Posts Microservice");
    console.log('Post listening on port 4000!');
});