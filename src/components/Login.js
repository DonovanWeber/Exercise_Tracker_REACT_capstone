import { useRef, useState } from "react";
import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert } from "react-bootstrap"

function Login(){

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  async function handleLogin(e){
    e.preventDefault();

    try{
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      
      navigate('/');
    } catch{
      setError("Failed to log in")
    }

    setLoading(false)
    }

  async function handleLogout(e){
    e.preventDefault();

    try{
      setError("")
      setLoading(true)
      await logout();
      navigate('/');
      console.log("successfully logged out")
    } catch {
      setError("Failed to logout")
    }
    setLoading(false)
  }
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'> Log In</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an Account? <Link to='/sign-up'>Sign Up</Link>
      </div>
      <div className="w-100 text-center mt-2">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </React.Fragment>
  )
}

export default Login