import React, { Fragment, useContext } from 'react';
import './style.css';
import { Comment, CommentInput } from '../../components';
import { db, storage } from '../../firebase';
import { UserContext } from '../../contexts/user';

export default function Post({ profileUrl, username, id, photoURL, caption, comments }) {
    const [user] = useContext(UserContext).user;

    const deletePost = () => {
        //delete image from firebase storage
        //get ref to the image file to delete
        var imageRef = storage.refFromURL(photoURL);

        //delete the file
        imageRef.delete().then(function () {
            console.log('Deleted successfully.');
        }).catch(function (error) {
            console.log(`Error : ${error}`);
        });

        //2 delete the post info from firerbase firestore Collection
        db.collection('posts').doc(id).delete().then(function () {
            console.log('Deleted successfully from firestore.');
        }).catch(function (error) {
            console.log(`Error Info : ${error}`);
        });
    }

    return (
        <Fragment>
            <div className='post'>
                <div>
                    <div className='post__header' >
                        <div className='post__headerLeft' >
                            <img src={profileUrl} className='post__profilePic' alt='your profile' />
                            <p style={{ marginLeft: '8px' }} >{username}</p>
                        </div>
                        <button onClick={deletePost} className='post__delete' >Delete</button>
                    </div>
                </div>

                <div className='post__center'>
                    <img src={photoURL} className='post_photoUrl' alt='the post' />
                </div>

                <div>
                    <p>
                        <span style={{ fontWeight: '500', marginRight: '4px' }} >{username}</span>
                        {caption}
                    </p>
                </div>

                {comments ? comments.map((comment) =>
                    <Comment username={comment.username} caption={comment.comment} />
                ) : ''
                }

                {user ? <CommentInput comments={comments} id={id} /> : ''}
            </div>
            <br />
        </Fragment>
    )
};
