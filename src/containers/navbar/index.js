import React, { useContext } from 'react';
import './style.css';
import { UserContext } from '../../contexts/user';

export default function Navbar(props) {
    const [user] = useContext(UserContext).user;

    return (
        <div className='navbar' >
            <p className='navbar__logo' >LetsGoSocial</p>
            {user ? <p className='navbar__home' > <span className='navbar__homeColor' >Welcome Home</span> {user.displayName} !</p> : ''}
            {user ? <img className='navbar__img' src={user.photoURL} alt='user' />
                :
                <button className='navbar__login' onClick={props.onSignInClick} >Sign In</button>
            }
        </div>
    )
}
