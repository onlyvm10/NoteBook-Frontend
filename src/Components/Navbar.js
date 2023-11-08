import React from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogOut=()=>{
    localStorage.removeItem('token');
    //redirect to login page
    navigate("/login");

  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/signup">NoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location === '/' ? 'active' : ''}`} aria-current="page" to="/Home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === '/' ? 'active' : ''}`} aria-current="page" to="/AboutApp">About App</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === '/About' ? 'active' : ''}`} to="/About">About Developer</Link>
              </li>

            </ul>
            {!localStorage.getItem('token')?<form className="form-inline my-2 my-lg-0">
               
            <Link className="btn btn-light mx-2" to="/login" role="button">Log In</Link>
            <Link className="btn btn-light mx-2" to="/signup" role="button">Sign Up</Link>
            </form>: <button className='btn btn-light' onClick={handleLogOut}>Log Out</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}
