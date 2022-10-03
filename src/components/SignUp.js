
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState, useRef } from "react";
// import { auth } from "../firebase.config";
import { Form, Button, Card, Alert } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

function SignUp(){
  // const [signUpSuccess, setSignUpSuccess] = useState(null);
  // const [signInSuccess, setSignInSuccess] = useState(null);
  // const [signOutSuccess, setSignOutSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const navigate = useNavigate()
  const { signup } = useAuth();

  async function handleSubmit(e){
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError("The passwords you entered do not match please try again");
    }

    try{
      setError("");
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      console.log("hit:", passwordRef.current.value)
      navigate('/')
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }
  // function doSignIn(event){
  //   event.preventDefault();
  //   const email = event.target.signInEmail.value;
  //   const password = event.target.signInPassword.value;
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       setSignInSuccess(`Thank you for signing in as ${userCredential.user.email}!`)
  //     })
  //     .catch((error) => {
  //       setSignInSuccess(`There was an error signing in ${error.message}!`)
  //     });
  // }
  // function doSignUp(event){
  //   event.preventDefault();
  //   const email = event.target.email.value;
  //   const password = event.target.password.value;
  //   createUserWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         //user successfully signed up 
  //         setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
  //       })
  //       .catch((error) =>{
  //         //there was an error with sign up 
  //         setSignUpSuccess(`There was an error signing up: ${error.message}!`)
  //       });
  // }
  // function doSignOut(){
  //   signOut(auth)
  //     .then(function(){
  //       setSignOutSuccess("You've successfully signed out!");
  //     })
  //     .catch(function(error){
  //       setSignOutSuccess(`There was an error signing out: ${error.message}!`)
  //     });
  // }

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
              <Form.Label>password</Form.Label>
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