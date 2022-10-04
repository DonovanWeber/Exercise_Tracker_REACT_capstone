

import React, { useState, useRef } from "react";
// import { auth } from "../firebase.config";
import { Form, Button, Card, Alert } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { auth, db } from "../firebase.config";
import { collection, setDoc, doc} from 'firebase/firestore';


function SignUp(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { currentUser } = useAuth();
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const navigate = useNavigate()
  const { signup } = useAuth();

  async function handleAddNewUserToDoc(){
    const userUid = currentUser.uid;
    console.log(userUid);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await setDoc(doc(db, 'users', userUid), {
      email,
      password,
    });
  }

  async function handleSubmit(e){
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError("The passwords you entered do not match please try again");
    }

    try{
      setError("");
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      console.log(currentUser);
      if(currentUser !== null){
      handleAddNewUserToDoc();
      }
      navigate('/')
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return(
    <React.Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up!</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id='confirm-password'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Button disabled={loading} className='w-100' type="submit"> Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already Have An Account? <Link to="/login">Log In!</Link>
      </div>
    </React.Fragment>

  )
}

export default SignUp