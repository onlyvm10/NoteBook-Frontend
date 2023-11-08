import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
 
    const{showAlert} = props;
    const host = "http://localhost:5000";

    const [Credentials, setCredentials] = useState({ name:"",email: "", password: "", cpassword:"" });

    let history = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        //API CALL : 
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({name:Credentials.name, email: Credentials.email, password: Credentials.password }),
        });
        const json = await response.json();
        if(Credentials.password!==Credentials.cpassword)
        {
            showAlert("Password and Confirm password do not match","danger");       
        }
        else if(json.success)
        {
            localStorage.setItem('token',json.AuthToken);
            history("/Home");  
            showAlert("SignUp successsful","success");
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
        <div className='container'>
            <h1 className='my-4'>Sign Up to use NoteBook</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name='name'
                        onChange={onChange}
                        value={Credentials.name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        name='email'
                        onChange={onChange}
                        value={Credentials.email}
                    />
                    <div id="emailHelp" className="form-text">
                      <i>  *We'll never share your email with anyone else. New email is required for signup.</i>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name='password'
                        onChange={onChange}
                        value={Credentials.password}
                        minLength={5} required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        *Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name='cpassword'
                        onChange={onChange}
                        value={Credentials.cpassword}
                        minLength={5} required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>

        </div>
    )
}
