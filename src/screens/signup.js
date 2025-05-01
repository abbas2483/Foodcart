import React,{useState,Suspense,lazy} from 'react'
import { Link } from 'react-router-dom';
const SplineComponent = lazy(() => import('@splinetool/react-spline'));

export default function Signup() {
    const [credentials, setcredentials] = useState({name: "", email: "", password: "", geolocation: ""});
    const handleSubmit = async(e) => {
            e.preventDefault();
            console.log(JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation})); 
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });
            const json = await response.json();
            console.log(json);
            if(json.success){
                alert('User Created');
            }
            else {
                alert('Enter Valid Credentials');
              }
    }
    const onchange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
    } 
  return (
    <div>
    <div  style={{ position: 'relative', width: '100%', height: '100vh' }}><Suspense fallback={<div>Loading Spline...</div>} />
            <SplineComponent scene="https://prod.spline.design/2LffDOAc-8sDygWk/scene.splinecode" />
    <div className="container align-items-center p-5 w-50 text-dark" style={{borderRadius:"10px",position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '1',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(5px)'}}>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center ">Sign Up</h1>
        <div className="mb-3">
    <label htmlFor="name"className="form-label">Email</label>
    <input type="email"className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange}/>
    <div id="emailHelp"className="text-dark">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="name"className="form-label">Username</label>
    <input type="text"className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' value={credentials.name} onChange={onchange}/>
    <div id="emailHelp"className="text-dark">We'll never share your Password with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password"className="form-label">Password</label>
    <input type="password"className="form-control" id="password" name='password' value={credentials.password} onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="address"className="form-label">Address</label>
    <input type="text"className="form-control" id="address" name='geolocation' value={credentials.geolocation} onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary" style={{backgroundColor:'orange'}}>Submit</button>
  <Link to="/login" className="btn btn-primary bg-danger m-3">Already A User </Link>
</form>
    </div>
    </div>
    </div>
  )
}
