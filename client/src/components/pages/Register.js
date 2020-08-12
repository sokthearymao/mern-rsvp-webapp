import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Register = () => {
    const { user, setUser } = useState({name: '', email: '', password: '', password2: ''})
    const { name, email, password, password2 } = user
    return (
        <div className="register">
            <h1>Sign Up</h1>
            <form action="">
                <input type="text" name="name" placeholder="name" value={name} />
                <input type="text" name="email"  placeholder="email" value={email} />
                <input type="password" name="password" placeholder="Password" value={password} />
                <input type="password" name="password2"  placeholder="Confirm Password" value={password2} />
                <input type="submit" value="Sign Up" className="btn" />
            </form>
            <div className="question">
    <p>Already have an account? {" "} <Link to='/login '>Login</Link> </p>
            </div>
        </div>
    )
}

export default Register