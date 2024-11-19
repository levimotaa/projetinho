import axios from 'axios'
import React from 'react'

const loginService = () => {
    axios.post('http://localhost:5062/Auth/Login', {
        email: '',
        password: ''
    });

    return (
        <div>loginService</div>
    )
}

export default loginService