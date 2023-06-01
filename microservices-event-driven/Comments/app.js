const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const cors = require('cors')
const amqplib = require('amqplib')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const queue = "comments"
const eventBus = "event-bus"
let connection = null;
let channel = null;

const queueConnection = async () => {
    connection = await amqplib.connect('amqps://wondrzpu:f863xo5nI1WSdOrlUEZQIEleQi88vdgs@armadillo.rmq.cloudamqp.com/wondrzpu');
    channel = await connection.createChannel();
    await channel.assertQueue(queue);
    channel.consume(queue, consume)
}

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    console.log("GET /posts")
    return res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    console.log("POST /posts")
    const commentsId = randomBytes(4).toString('hex');
    const { content } = req.body;


    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentsId, content: content });
    commentsByPostId[req.params.id] = comments

    const data = {
        type: "Created Comment", data: {
            id: commentsId, content,
            postId: req.params.id,
            status: 'pending'
        }
    }
    await channel.sendToQueue(eventBus, Buffer.from(JSON.stringify(data)));

    return res.send(comments)

});


const consume = async (msg) => {
    console.log("POST /events")
    const { type, data: payload } = JSON.parse(msg.content.toString());

    // its call to comments server to modared comment
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = payload
        const comments = commentsByPostId[postId]
        const comment = comments?.find(comment => {
            return comment.id === id
        })
        if (comment) {
            comment.status = status
        }


        const data = {
            type: 'CommentUpdated',
            data: {
                id: payload.id,
                postId,
                status,
                content
            }
        }

        await channel.sendToQueue(eventBus, Buffer.from(JSON.stringify(data)));

    }
}

app.listen(4001, async () => {
    await queueConnection();
    console.log('Comments Microservice');
    console.log('Comment server listening on port 4001!');
});