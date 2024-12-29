import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const host = "https://inotebook-backend-f89o.onrender.com"

const SignUp = (props) => {

  const [creds, setCreds] = useState({ email: "", password: "", name:"", cpassword:""});
    let navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/v1/auth/createUser`;
        const {name, email, password} = creds
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            //save the auth token and rediect
            localStorage.setItem('token', json.authToken);
            navigate("/")
            props.showAlert("Account Created Successfully" ,"success")
        }
        else{
            props.showAlert("Invalid Credentials" ,"danger")
        }
    };

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className={`form-label text-${props.mode}`}>User Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name='name'required minLength={3}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className={`form-label text-${props.mode}`}>Email</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp"required minLength={3}/>
            <div id="emailHelp" className={`form-text text-${props.mode}`}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className={`form-label text-${props.mode}`}>Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name='password'required minLength={3}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className={`form-label text-${props.mode}`}>Confrim Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword'required minLength={3}/>
        </div>
        <button type="submit" className={`btn btn-${props.mode}`}>Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
