const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const amqplib = require('amqplib');

app.use(bodyParser.json())
app.use(cors())


const queue = "query"
let connection = null;
let channel = null;
let posts = {}

const consume = (msg) => {
    const { type, data } = JSON.parse(msg.content.toString())

    if (type === 'Created Posts') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }
    if (type === 'Created Comment') {
        const { id, content, postId, status } = data
        const post = posts[postId]
        post.comments.push({ id, content, status })
    }
    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data
        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id
        })
        comment.status = status;
        comment.content = content;

    }
    console.log(posts)
}

const queueConnection = async () => {
    connection = await amqplib.connect('amqps://wondrzpu:f863xo5nI1WSdOrlUEZQIEleQi88vdgs@armadillo.rmq.cloudamqp.com/wondrzpu');
    channel = await connection.createChannel();

    await channel.assertQueue(queue);
    channel.consume(queue, consume)

}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.listen(4002, async () => {
    await queueConnection();
    console.log('Query microservice')
    console.log('Server is runnig on 4002')
})