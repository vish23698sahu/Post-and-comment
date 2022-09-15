import React from 'react';
import { CreatePost } from '../../containers';
import Feed from '../../containers/feed';
import Navbar from '../../containers/navbar';
import './style.css';

export default function Home() {
    return (
        <div className='home' >
            <Navbar />
            <CreatePost />
            <Feed />
        </div>
    )
}
