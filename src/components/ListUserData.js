import React, {useState, useEffect } from 'react'
import { collection, getDocs, query, where} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useAuth } from '../contexts/AuthContext'

function ListUserData(){
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});

  //console.log(currentUser);

  useEffect(() => {
    getUserData();
  }, [])

  function getUserData(){
    const userCollectionRef = collection(db, 'users');
    getDocs(userCollectionRef)
      .then(response => {
    
        const user = response.docs.filter(user => (user.data.id === currentUser.uid))
        console.log("listedUserData: ",user);
        setUser(user);
       
      })
      .catch(error => console.log(error.message))
  }
  
  return (
    <div>
      <h1>List User Data</h1>
      <li key={user.id}>1</li>
    </div>
  )
}

export default ListUserData