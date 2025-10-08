import { useState, Suspense, lazy } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import config from "../config";
const SplineComponent = lazy(() => import('@splinetool/react-spline'));
export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    const response = await fetch(`${config.API_URL}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/');
    }
    else {
      alert('Enter Valid Credentials');
    }
  }

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}><Suspense fallback={<div>Loading Spline...</div>} />
        <SplineComponent scene="https://prod.spline.design/2LffDOAc-8sDygWk/scene.splinecode" />
        <div className="container align-items-center p-5 w-50 text-dark" style={{ borderRadius: "10px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(5px)' }}>
          <form onSubmit={handleSubmit}>
            <h1 className="text-center ">Login</h1>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange} />
              <div id="emailHelp" className="text-dark">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} />
            </div>
            <button type="submit" className="btn btn-primary" style={{backgroundColor:'orange'}}>Login</button>
            <Link to="/createuser" className="btn btn-primary bg-danger m-3"> New User? Sign up </Link>
          </form>f
        </div>
      </div>
    </div>
  )
}
