import React from 'react';
import logo from "../../images/logo.png";
import Footer from '../base/Footer';
import SignIn from './LoginPage';

export default function LoginContainer() {
    return (
        <div className='text-center'>
            <div className='outer-div'>
                <img src={logo} height={200} />
                <SignIn />
            </div>
            <Footer />
        </div>
    );
}


