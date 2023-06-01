import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Comments from './Comments'
import CommentsList from './GetComment'

const Posts = () => {

    const [posts, setPosts] = useState({})


    const fatchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4002/posts');
            setPosts(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fatchPosts()

    }, [])


    const renderPosts = Object.values(posts).map(post => {

        return (
            <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <p>{post.id}</p>
                    <CommentsList comments={post.comments} />
                    <Comments postId={post.id} />
                </div>
            </div>
        );

    })

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderPosts}
    </div>
}
export default Posts