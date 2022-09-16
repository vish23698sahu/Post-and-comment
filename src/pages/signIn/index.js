import React from 'react';
import { SignInBtn } from '../../components';
import './style.css';

export default function SignIn() {
    return (
        <div className='signIn__container' >
            <div className='signIn__box' >
                <form>
                    <input className='signIn__email' type='text' placeholder='email' /><br /><br />
                    <input className='signIn__password' type='password' placeholder='password' /><br />

                    <button className='signIn__login' >Login</button><br /><br /><br />
                    <hr /><br />
                    <div className='signIn__google' ><SignInBtn /></div>
                    <hr /><br /><br />
                    <div>
                        Don't have an account ? <span className='signIn__signUp' >Sign Up</span>
                    </div>

                </form>
            </div>
        </div>
    )
}
