import React from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
    return (
        <div className="login">
            <h1>Login</h1>
            <form action="">
                <input type="text" name="email"  placeholder="email" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Sign In" className="btn" />
            </form>
            <div className="question">
    <p>Don't have an account? Please sign up here! {" "} <Link to='/register '>Sign Up</Link> </p>
            </div>
        </div>
    )
}

export default Login