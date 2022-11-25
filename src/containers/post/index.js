import React, { Fragment, useContext } from 'react';
import './style.css';
import { Comment, CommentInput } from '../../components';
import { db, storage } from '../../firebase';
import { UserContext } from '../../contexts/user';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Post({ profileUrl, username, id, photoURL, caption, comments, onDelete }) {
    const [user] = useContext(UserContext).user;

    console.log('user post ', username);

    const deletePost = () => {
        //delete image from firebase storage
        //get ref to the image file to delete
        var imageRef = storage.refFromURL(photoURL);

        // if (onDelete.username === username) {
        //delete the file
        imageRef
            .delete()
            .then(function () {
                console.log("Deleted successfully.");
            })
            .catch(function (error) {
                console.log(`Error : ${error}`);
            });

        //2 delete the post info from firerbase firestore Collection
        db.collection("posts")
            .doc(id)
            .delete()
            .then(function () {
                console.log("Deleted successfully from firestore.");
            })
            .catch(function (error) {
                console.log(`Error Info : ${error}`);
            });
        // }
        // else{
        // alert("You dont have permission to delete someone else's post");
        // }

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
                        {user ? <button onClick={deletePost} className='post__delete' >
                            <DeleteIcon sx={{ fontSize: '30px' }} />
                        </button> : ''}
                    </div>
                </div>

                <div>
                    <img src={photoURL} className='post_photoUrl' alt='the post' />
                </div>

                <div className='post_alignComment'>
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

            </div>
            <br />
        </Fragment>
    )
};
