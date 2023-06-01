import axios from 'axios'
import React, { useState } from 'react'
const Comments = ({ postId }) => {

    const [content, setContent] = useState('')

    const submitNewCommand = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content })
            setContent('')
            document.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form onSubmit={submitNewCommand}>
                <div className="form-group">
                    <label htmlFor="name" >New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} type="text" className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Comments