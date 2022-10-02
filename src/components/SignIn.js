import { ReadMoreRounded } from "@mui/icons-material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from './../firebase.js';

function SignIn(){
  
  
  return(
    <React.Fragment>
      <h1> Sign Up</h1>
      {signInSuccess}
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