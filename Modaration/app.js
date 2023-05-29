const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

app.use(bodyParser.json())
app.use(cors())



app.post('/events', async (req, res) => {
    console.log("POST /events")
    const { type, data } = req.body;

    // its call to comments server to modared comment
    if (type === 'Created Comment') {
        const status = data.content.includes('NodeJs') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated', data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })

    }
})

app.get('/posts', (req, res) => {
    console.log('GET /posts')
    res.send(posts)
})

app.listen(4003, () => {
    console.log('Modaration microservice')
    console.log('Server is runnig on 4003')
})