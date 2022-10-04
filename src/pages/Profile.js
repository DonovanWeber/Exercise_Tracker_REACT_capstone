import { Card, Form, Button, Alert } from 'react-bootstrap'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase.config";
import { doc, addDoc, Collection, setDoc } from 'firebase/firestore';

function Profile(){
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();


  async function handleUserStats(e){
    e.preventDefault();
    try{
    await setDoc(doc(db, "users", currentUser), {
      name: e.target.name.value,
      age: e.target.age.value,
      height: e.target.height.value,
      weight: e.target.weight.value
      
    })} catch {
      setError(error);
      console.log("Not adding to databse");
    }
  }
  return (
    <React.Fragment>
      <h1> Welcome</h1>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group id='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type="string" />
            </Form.Group>
            <Form.Group id='age'>
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" min="0" />
            </Form.Group>
            <Form.Group id='height'>
              <Form.Label>Height</Form.Label>
              <Form.Control type="string" />
            </Form.Group>
            <Form.Group id='weight'>
              <Form.Label>weight</Form.Label>
              <Form.Control type="number" min="0" />
            </Form.Group>
            <Button type='submit' onClick={handleUserStats}>Add your stats</Button>
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default Profile