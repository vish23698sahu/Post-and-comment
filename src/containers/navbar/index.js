import React, { useContext } from 'react';
import './style.css';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';

export default function Navbar() {
    const [user] = useContext(UserContext).user;

    return (
        <div className='navbar' >
            <p>LetsGoSocial</p>
            {user ? <img className='navbar__img' src={user.photoURL} alt='user' /> : <SignInBtn />}
        </div>
    )
}
