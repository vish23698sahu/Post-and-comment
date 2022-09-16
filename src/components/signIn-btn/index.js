import React, { useContext } from "react";
import './style.css';
import { signInWithGoogle } from '../../services/auth';
import { UserContext } from "../../contexts/user";

export default function SignInBtn() {
    const [user, setUser] = useContext(UserContext).user;

    const signInBtnClick = async () => {
        let userBySignIn = await signInWithGoogle();
        if (userBySignIn) setUser(userBySignIn);
        console.log(user);
    }

    return <div className="signInBtn" onClick={signInBtnClick}>
        <p>Sign in With Google</p>
    </div>
};
