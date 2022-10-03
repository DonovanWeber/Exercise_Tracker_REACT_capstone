
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.config";

function SignIn(){
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);
  
  function doSignIn(event){
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`Thank you for signing in as ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in ${error.message}!`)
      });
  }
  function doSignUp(event){
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //user successfully signed up 
          setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
        })
        .catch((error) =>{
          //there was an error with sign up 
          setSignUpSuccess(`There was an error signing up: ${error.message}!`)
        });
  }
  function doSignOut(){
    signOut(auth)
      .then(function(){
        setSignOutSuccess("You've successfully signed out!");
      })
      .catch(function(error){
        setSignOutSuccess(`There was an error signing out: ${error.message}!`)
      });
  }

  return(
    <React.Fragment>
      <h1> Sign Up</h1>
      {signUpSuccess}
      <form onSubmit={doSignUp}>
        <input 
          type='text'
          name='email'
          placeholder='email' />
        <input 
          type='text'
          name='password'
          placeholder='password' />
        <button type='submit'>Sign Up</button>
       </form>

       <h1>Sign In</h1>
       {signInSuccess}
       <form onSubmit={doSignIn}>
        <input 
          type='text'
          name='signInEmail'
          placeholder='email' />
        <input
          type='text'
          name='signInPassword'
          placeholder='password' />
        <button type='submit'>Sign In</button>
       </form>
       <h1> Sign Out </h1>
       <br />
       <button onClick={doSignOut}>Sign Out</button>
    </React.Fragment>

  )
}

export default SignIn