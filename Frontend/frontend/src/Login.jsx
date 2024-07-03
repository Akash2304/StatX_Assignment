import React from 'react';
import './Login.css'; // Import the CSS file

const Login = ({ setIsAdmin, setIsLoggedIn }) => {
    const loginAsUser = () => {
        setIsAdmin(false);
        setIsLoggedIn(true);
    };

    const loginAsAdmin = () => {
        setIsAdmin(true);
        setIsLoggedIn(true);
    };

    return (
        <div className="login-container">
            <h1>Login Page</h1>
            <button className="login-button" onClick={loginAsUser}>Login as User</button>
            <button className="login-button" onClick={loginAsAdmin}>Login as Admin</button>
        </div>
    );
};

export default Login;
