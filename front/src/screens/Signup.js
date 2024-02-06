import React, { useState } from 'react'
import { Navbar } from 'react-bootstrap';
import { Link,useNavigate } from "react-router-dom"

export default function Signup() {
  let navigate=useNavigate();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      }))
    const response = await fetch("http://localhost:5000/api/creatuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if(json.success){
      navigate("/login");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar/>
      </div>
      <div className="container">
        <form className='w-50 m-auto mt-5 border bg-light border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className=" m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
