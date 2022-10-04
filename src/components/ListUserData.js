import React, {useState, useEffect } from 'react'
import { collection, getDocs} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useAuth } from '../contexts/AuthContext'

function ListUserData(){
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});

  console.log(currentUser);

  useEffect(() => {
    getUserData();
  }, [])
  function getUserData(){
    const userCollectionRef = collection(db, 'users');
    getDocs(userCollectionRef)
      .then(response => {
        const user = response.docs.map(doc => ({
          data: doc.data(), 
          id: doc.id,
        }))
        setUser(user);
        console.log("user data", user, user.data.age)
      })
      .catch(error => console.log(error.message))
  }
  return (
    <div>
      <h1>List User Data</h1>
      {/* <li key={user.id}>{user.data.age}</li> */}
    </div>
  )
}

export default ListUserData