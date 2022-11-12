import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import './style.css';

export default function CommentInput({ comments, id }) {
    const [user] = useContext(UserContext).user;
    const [comment, setComment] = useState('');
    const [commentArray] = useState(comments ? comments : []);

    const addComment = () => {
        //add comment to the post info
        if (comment === '') {
            return;
        }
        else if (comment !== '') {
            commentArray.push({
                comment: comment,
                username: user.email.replace('@gmail.com', '').toLowerCase(),
            });

            db.collection('posts').doc(id).update({ comments: commentArray })
                .then(function () {
                    setComment('');
                }).catch(function (error) {
                    console.log(`Error : ${error}`)
                })
        }
    }

    return (
        <div className='commentInput' >
            <textarea
                className='commentInput__textarea'
                rows='1'
                placeholder='Enter your Comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            >
            </textarea>
            <button onClick={addComment} className='commentInput__btn' >Post</button>
        </div>
    )
}
