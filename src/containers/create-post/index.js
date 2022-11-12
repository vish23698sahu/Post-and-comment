import React, { useContext, useState } from 'react';
import './style.css';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import { db, storage } from '../../firebase';
import firebase from 'firebase/compat/app';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import makeId from '../../helper/functions';

export default function CreatePost() {
    const [user] = useContext(UserContext).user;
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);

            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagePreview = document.getElementById('image-preview');

            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = 'block';
        }
    }

    const handleUpload = () => {
        if (image) {
            var imageName = makeId(10);
            const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
            uploadTask.on('state_changed', (snapshot) => {
                //progress function 1%, 2%...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                setProgress(progress);
            }, (error) => {
                console.log(error);
            }, () => {
                //get download URL and upload the post info
                storage.ref('images').child(`${imageName}.jpg`).getDownloadURL()
                    .then((imageUrl) => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            photoUrl: imageUrl,
                            username: user.email.replace('@gmail.com', ''),
                            profileUrl: user.photoURL
                        })
                    });

                setCaption('');
                setProgress(0);
                setImage(null);
                var imagePreview = document.getElementById('image-preview');
                imagePreview.style.display = 'none';
            });
        }
    }

    return (
        <div className='createPost'>
            {user ?
                <div className='createPost__loggedIn' >
                    <p>Create Post</p>
                    <div className='createPost__loggedInCenter'>
                        <textarea
                            className='createPost__textarea'
                            rows='3'
                            placeholder='enter caption here...'
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        >
                        </textarea>

                        <div className='createPost__imagePreview' >
                            <img id='image-preview' alt='preview of post' />
                        </div>

                    </div>
                    <div className='createPost__loggedInBottom' >
                        <div className='createPost__imageUpload' >
                            <label htmlFor='fileInput'>
                                <AddAPhotoIcon style={{ cursor: 'pointer', fontSize: '25px' }} />
                            </label>
                            <input id='fileInput' type='file' accept='image/*' onChange={handleChange} />
                        </div>
                        <button
                            onClick={handleUpload}
                            className='createPost__uploadBtn'
                            style={{ color: caption ? '#000' : 'lightgrey' }}
                        >{`Upload ${progress !== 0 ? `${progress}%` : ''}`}
                        </button>
                    </div>
                </div>
                :
                <div>
                    <SignInBtn />
                    <p style={{ marginLeft: '12px' }} className="createPost__below" >To view, comment, and post... </p>
                </div>
            }
        </div>
    )
}
