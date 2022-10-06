import { Card, Form, Button, Alert } from 'react-bootstrap'
import React, { useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase.config";
import { doc, getDoc, addDoc, collection, setDoc, updateDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import ListUserData from '../components/ListUserData';

import { Link } from 'react-router-dom';


function Profile(){
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState(0);
  const [repWeight, setRepWeight] = useState(0);
  const [reps, setReps] = useState(0);
  
  const retrieveUserData =  async () => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    
    if(docSnap.exists()) {
      const userDataSnap = docSnap.data();
      console.log("userData: ", userDataSnap)
      setUserData(userDataSnap);
      
      return userDataSnap
    } else {
      console.log("No such document!");
      setError("No such document!")
    }
  }
  
  const handleAddNewUserDataToDoc = async(userData) =>{
    const userRef = doc(db, 'users', currentUser.uid.toString());
    await updateDoc(userRef, userData);
  }
  
  async function handleAddNewUserToDoc(){
    const userUid = currentUser.uid;
    const id = v4();
    console.log(userUid);
    await setDoc(doc(db, 'users', userUid), {
      id
    });
  }
  
  
  async function handleUserStats(e){
    e.preventDefault();
    handleAddNewUserToDoc();
    if(currentUser !== null){
      try{
        handleAddNewUserDataToDoc({
          name,
          age,
          height,
          weight,
          repWeight,
          reps,
          
        })} catch {
          setError(error);
        }
      }
    }
   
    const profileToList = () => {
      if(currentUser !== null){
        const userData = retrieveUserData();
        console.log("userData from profile: ", userData);
        setUserData(userData);
      }
    }

    return (
      <React.Fragment>
      <h1> Welcome</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={handleUserStats}>
            <Form.Group id='name'>
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" onChange={(e)=> setName(e.target.value)}/>
            </Form.Group>
            <Form.Group id='age'>
              <Form.Label>Age:</Form.Label>
              <Form.Control type="number" min="0"  onChange={(e)=> setAge(e.target.value)}/>
            </Form.Group>
            <Form.Group id='height'>
              <Form.Label>Height:</Form.Label>
              <Form.Control type="text" onChange={(e)=> setHeight(e.target.value)} />
            </Form.Group>
            <Form.Group id='weight'>
              <Form.Label>Weight:</Form.Label>
              <Form.Control type="number" min="0"  onChange={(e)=> setWeight(e.target.value)}/>
            </Form.Group>
            <h3>Please enter the amount of weight you use for an exercise and the reps it takes to get you to failure using that weight to find out your one rep maximum and more!</h3>
            <Form.Group id='rep-weight'>
              <Form.Label>Amount of weight you use:</Form.Label>
              <Form.Control type="number" min="0"  onChange={(e)=> setRepWeight(e.target.value)}/>
            </Form.Group>
            <Form.Group id='reps'>
              <Form.Label>Reps:</Form.Label>
              <Form.Control type="number" min="0"  onChange={(e)=> setReps(e.target.value)}/>
            </Form.Group>
            <br />
            <Button onClick={() => profileToList()}type='submit'>Add your stats</Button>
          </Form>
        </Card.Body>
      </Card>
      <ListUserData userData={userData} />
    </React.Fragment>
  )
}

export default Profile