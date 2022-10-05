import React, {useState, useEffect } from 'react'
import { collection, getDocs, getDoc, query, where, doc} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useAuth } from '../contexts/AuthContext'
import { useFirestoreDocument } from '@react-query-firebase/firestore';


//console.log(currentUser);

function ListUserData(){
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    
    // const ref = doc(db, 'users', currentUser.uid);
    // console.log("ref: ", ref);
    // const userDocSnapshot = useFirestoreDocument(['users', currentUser.uid], ref);
    //console.log("data: ", userDocSnapshot.data());
    const retrieveUserData =  async () => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    //userDocSnapshot.data._key.path.segments[1]
    const docSnap = await getDoc(userDocRef);

    if(docSnap.exists()) {
      const userData = docSnap.data();
      console.log("userData: ", userData)
      const userDataObject = Object.values(userData)
      //setUser(userData);
      return userData
     // console.log("Document Data: ", docSnap.data());
    } else {
      console.log("No such document!");
      setError("No such document!")
    }
  }
  // function userDataObject() {
  //   Object.values(retrieveUserData).map((value, index) => {
  //     const dataObject = {
  //       name: value.name,
  //       age: value.age,
  //       height: value.height,
  //       weight: value.weight
  //     }
  //     setUser(dataObject)
  //     return dataObject;
  //   })
  // }
  console.log(user);

    useEffect(() => {
      retrieveUserData();
    }, [])
  
  //function getUserData(){

    //try {
    //setError("");
    //console.log("retrieved user data: ", user);
    // } catch {
    //   setError("Did not retrieve data")
  //}
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
      <li>{}</li>
    </div>
  )
}

export default ListUserData