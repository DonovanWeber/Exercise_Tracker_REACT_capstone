import React, {useState, useEffect } from 'react'
import { collection, getDocs, getDoc, query, where, doc} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useAuth } from '../contexts/AuthContext'
import { useFirestoreDocument } from '@react-query-firebase/firestore';




function ListUserData({userData}){
    const { currentUser } = useAuth();
    //const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    console.log("userDataInsideOfList: ", userData);
    const [userCollectedData, setUserCollectedData] = useState();
    setUserCollectedData(userData);
    
    useEffect(() => {
      if(userData !== null){
      setUserCollectedData(userData);
      console.log("userData inside useEfffect",userData )
      setError("successful data transfer")
      } else {
        setError("no data!")

      }
    }, [])

  // try {
  //     if(userData !== null){
  //     setError("userData exists but not right operation");
  //     }
  //   } catch {
  //     setError("no data passed")
  //   }
  //   useEffect(() => {
  //     if(currentUser !== null){
  //     const userData = retrieveUserData();
  //     setUser(userData);
  //     }
  //   },[currentUser])

  //   const retrieveUserData =  async () => {
  //   const userDocRef = doc(db, 'users', currentUser.uid);
  //   const docSnap = await getDoc(userDocRef);

  //   if(docSnap.exists()) {
  //     const userData = docSnap.data();
  //     console.log("userData: ", userData)
  //     setUser(userData);
      
  //     return userData
  //   } else {
  //     console.log("No such document!");
  //     setError("No such document!")
  //   }
  // }

    

  return (
    <div>
      <h1>List User Data</h1>
      {userData 
      ?
      <ul>
        <li>{userData.name}</li>
        <li>{userData.age}</li>
        <li>{userData.height}</li>
        <li>{userData.weight}</li>
      </ul>
      : {error}
      }
    </div>
  )
}

export default ListUserData