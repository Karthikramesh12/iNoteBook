import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const host = "https://inotebook-frontend-3.onrender.com"

const Login = (props) => {
    const [creds, setCreds] = useState({ email: "", password: "" });
    let navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/v1/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: creds.email, password: creds.password })
        });
        const json = await response.json();
        if (json.success){
            //save the auth token and rediect
            localStorage.setItem('token', json.authToken);
            console.log("test" + json.authToken)
            navigate("/")
            props.showAlert("logged in successfully" ,"success")
        }
        else{
            props.showAlert("Invalid Credentials" ,"warning")
        }
    };

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className={`form-label text-${props.mode}`}>
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={creds.email}
                        aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                    <div id="emailHelp" className={`form-text text-${props.mode}`}>
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className={`form-label text-${props.mode}`}>
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={creds.password}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="checkBox" name="checkBox" />
                    <label
                        className={`form-check-label text-${props.mode}`}
                        htmlFor="checkBox"
                    >
                        Check me out
                    </label>
                </div>
                <button type="submit" className={`btn btn-${props.mode}`}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Login;
