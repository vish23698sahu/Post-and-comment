import React, { useEffect, useState } from 'react';
import './style.css';
import { Post } from '../../containers';
import { db } from '../../firebase';

export default function Card(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('static_Posts').onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
            })
            ));
        });
    }, []);

    return (
        <div className='card__container'>
            <br />
            {posts.map(({ id, post }) => {
                return <Post
                    key={id}
                    id={id}
                    profileUrl={post.profileUrl}
                    username={post.username}
                    photoURL={post.photoUrl}
                    caption={post.caption}
                    comments={post.comments}
                />
            })}
        </div>
    )
}
