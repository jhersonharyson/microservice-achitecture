const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const amqplib = require('amqplib')

app.use(bodyParser.json())
app.use(cors())

const eventBus = "event-bus"
const queue = "moderations"
let connection = null;
let channel = null;

const queueConnection = async () => {
    connection = await amqplib.connect('amqps://wondrzpu:f863xo5nI1WSdOrlUEZQIEleQi88vdgs@armadillo.rmq.cloudamqp.com/wondrzpu');
    channel = await connection.createChannel();
    await channel.assertQueue(queue);
    channel.consume(queue, consume)
}


const consume = async (msg) => {
    const { type, data: payload } = JSON.parse(msg.content.toString());
    console.log("mod", type)

    // its call to comments server to modared comment
    if (type === 'Created Comment') {
        const status = payload.content?.includes('NodeJs') ? 'rejected' : 'approved';
        const data = {
            type: 'CommentModerated',
            data: {
                id: payload.id,
                postId: payload.postId,
                status,
                content: payload.content
            }
        }

        await channel.sendToQueue(eventBus, Buffer.from(JSON.stringify(data)));

    }
}

app.get('/posts', (req, res) => {
    console.log('GET /posts')
    res.send(posts)
})

app.listen(4003, async () => {
    await queueConnection();
    console.log('Moderation microservice')
    console.log('Server is runnig on 4003')
})