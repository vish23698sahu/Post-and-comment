import React, { useContext, useState } from 'react';
import { Card, Footer } from '../../components';
import { CreatePost } from '../../containers';
import Feed from '../../containers/feed';
import Navbar from '../../containers/navbar';
import { UserContext } from '../../contexts/user';
import SignIn from '../signIn';
import './style.css';

export default function Home() {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [showCard, setShowCard] = useState(true);
    const [user] = useContext(UserContext).user;

    const navbarClickHandler = () => {
        setShowNavbar(false);
        setShowSignIn(true);
        setShowCard(false);
    }

    return (
        <div className='home' >
            {showNavbar && <Navbar onSignInClick={navbarClickHandler} />}
            <h1 className='home__line' >Showcase your Work</h1><br />
            {!user && <div> <p className='home__p'>Lets share our current working items, progress, and ideas.</p><p className='home__p2'>P.S. No one can ever steal it from you.</p> </div>}
            <CreatePost /><br />
            {showCard && !user && <Card />}
            {showSignIn && !user && <SignIn />}
            {user ? <Feed userInfo={user} /> : ''}
            <Footer />
        </div>
    )
}
