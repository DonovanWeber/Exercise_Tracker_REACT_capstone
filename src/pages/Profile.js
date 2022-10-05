import { Card, Form, Button, Alert } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase.config";
import { doc, getDoc, addDoc, collection, setDoc, updateDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import ListUserData from '../components/ListUserData';

import { Link } from 'react-router-dom';


function Profile(){
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState();
  const [userData, setUserData] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState(0);

  
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
    
    // const userCollectionRef = collection(db, 'users');
    // await addDoc(userCollectionRef, userData)
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
    // const id = currentUser.uid;
    // console.log(id);
    handleAddNewUserToDoc();

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
      if(currentUser !== null){
        const userData = retrieveUserData();
        setUserData(userData);
      }
    }

    // useEffect(() => {
    //     if(currentUser !== null){
    //     const userData = retrieveUserData();
    //     setUserData(userData);
    //   }
  
    // },[userData])

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
      <ListUserData userData={userData} />
      <Link to='/results' style={{textDecoration: 'none', color: "#3A1212"}}>Results</Link>
    </React.Fragment>
  )
}

export default Profile