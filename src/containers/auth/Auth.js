import React from 'react';
import AuthForm from "./AuthForm";

const Auth = (props) => {

    const {onLogin} = props


    return (
        <div className="login-pages">
            <div className="login-form">
                <AuthForm onLogin={()=>onLogin()}/>
            </div>
        </div>
    );
};

export default Auth;