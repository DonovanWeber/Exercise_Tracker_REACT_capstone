import { useRef, useState } from "react";
import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert } from "react-bootstrap"

function Login(){

  const emailRef = useRef()
  const password = useRef()
  const {login} = useAuth();
  const [error, setError] = useState(""):
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e){
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
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleLogin}>
            
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default Login