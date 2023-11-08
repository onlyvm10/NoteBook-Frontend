import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


export default function Login(props) {
    const{showAlert} = props;

    const host = "http://localhost:5000";

    const [Credentials, setCredentials] = useState({ email: "", password: "" });

    let history = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        //API CALL : 
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ email: Credentials.email, password: Credentials.password }),
        });
        const json = await response.json();
        if(json.success)
        {
            //redirect
            localStorage.setItem('token',json.AuthData);
            history("/Home");          
            showAlert("Logged in","success");
        }
        else
        {
            showAlert("Invalid Credentials","danger");
        }
        console.log(json);
    }

    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} >
                <h1 className='my-3'>Log In</h1>
                <div className="my-4">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                        value={Credentials.email}
                        onChange={onChange}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={Credentials.password}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </div>


    )
}

