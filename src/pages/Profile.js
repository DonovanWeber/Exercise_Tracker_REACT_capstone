import { Card, Form, Button, Alert } from 'react-bootstrap'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase.config";
import { doc, addDoc, collection, setDoc, Firestore } from 'firebase/firestore';

function Profile(){
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState(0);

  const handleAddNewUserDataToDoc = async(userData) =>{
    const userCollectionRef = collection(db, 'users');
    await addDoc(userCollectionRef, userData)
  }
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
  
  async function handleUserStats(e){
    e.preventDefault();
    // const id = currentUser.uid;
    // console.log(id);
    if(currentUser !== null){
    try{
      handleAddNewUserDataToDoc({
      name,
      age,
      height,
      weight
      
    })} catch {
      console.log(name)
      setError(error);
      console.log("Not adding to database", error);
    }
  }
}
  return (
    <React.Fragment>
      <h1> Welcome</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={handleUserStats}>
            <Form.Group id='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={(e)=> setName(e.target.value)}/>
            </Form.Group>
            <Form.Group id='age'>
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" min="0"  onChange={(e)=> setAge(e.target.value)}/>
            </Form.Group>
            <Form.Group id='height'>
              <Form.Label>Height</Form.Label>
              <Form.Control type="text" onChange={(e)=> setHeight(e.target.value)} />
            </Form.Group>
            <Form.Group id='weight'>
              <Form.Label>weight</Form.Label>
              <Form.Control type="number" min="0"  onChange={(e)=> setWeight(e.target.value)}/>
            </Form.Group>
            <Button type='submit'>Add your stats</Button>
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default Profile