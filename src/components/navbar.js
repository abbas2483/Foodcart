import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark mw-100" style={{backgroundColor:'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(2px)'}}>
    <div className="container-fluid">
      <Link className="navbar-brand fs-1 fst-italic" style={{color:'orange'}} to="/">Foodcart</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        {/* <span className="navbar-toggler-icon"></span> */}
      </button>
      {(localStorage.getItem("token"))?
      <Link className="nav-link active" aria-current="page" style={{color:'orange', padding:2}} to="/">Myorder</Link>
      :""}
      <div className="collapse navbar-collapse justify-content-end ms-auto" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active ms-auto" aria-current="page" style={{color:'orange'}} to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active ms-auto" aria-current="page" style={{color:'orange'}} to="/">Feedback</Link>
          </li>
        
          {(!localStorage.getItem("token"))?
          <div className='d-flex'>
          <li className="nav-item">
            <Link className="nav-link active ms-auto" aria-current="page" style={{color:'orange'}} to="/createuser">Sign up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active ms-auto" aria-current="page" style={{color:'orange'}} to="/login">Login</Link>
          </li>
          </div>:
          <div className='d-flex'>
            <div>
             <li className="nav-item">
            <Link className="nav-link active ms-auto" aria-current="page" style={{color:'orange'}} to="/mycart">Mycart</Link>
          </li>
          </div>
            <Link className="nav-link active ms-auto" aria-current="page" style={{color:'orange'}} to="/login" onClick={()=> localStorage.removeItem("token")}>Logout</Link>
            </div>}

          
        </ul>
      </div>
    </div>
  </nav>
  </div>
  )
}
