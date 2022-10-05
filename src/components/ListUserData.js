import React, {useState, useEffect } from 'react'
import { collection, getDocs, query, where, doc} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useAuth } from '../contexts/AuthContext'
import { useFirestoreDocument } from '@react-query-firebase/firestore';


//console.log(currentUser);

function ListUserData(){
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    
    const ref = doc(db, 'users', currentUser.uid);
    console.log("ref: ", ref);
    const userDocSnapshot = useFirestoreDocument(['users', currentUser.uid], ref);
    
    useEffect(() => {
      getUserData();
    }, [])
  
  function getUserData(){

    //try {
    setError("");
    console.log("retrieved user data: ", userDocSnapshot);
    // } catch {
    //   setError("Did not retrieve data")
    // }
  }
    // const userCollectionRef = collection(db, 'users');
    
    
    // getDocs(userCollectionRef)
    //   .then(response => {
    
    //     const user = response.docs.filter(user => (user.data.id === currentUser.uid))
    //     console.log("listedUserData: ",user);
    //     setUser(user);
       
    //   })
    //   .catch(error => console.log(error.message))
  

  return (
    <div>
      <h1>List User Data</h1>
      <li key={user.id}>1</li>
    </div>
  )
}

export default ListUserData