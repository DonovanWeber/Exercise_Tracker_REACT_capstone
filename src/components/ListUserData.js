import React, {useState, useEffect } from 'react'
import { collection, getDocs, getDoc, query, where, doc} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useAuth } from '../contexts/AuthContext'





function ListUserData({userData}){
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userCollectedData, setUserCollectedData] = useState();
    const [userName, setUserName] = useState("");
    const [userWeight, setUserWeight] = useState("");
    const [userAge, setUserAge] = useState(0);
    const [userHeight, setUserHeight] = useState("");
    const [userRepWeight, setUserRepWeight] = useState(0);
    const [userReps, setUserReps] = useState(0);
    const [oneRepMax, setOneRepMax] = useState(0);
    const [intenseWeight, setIntenseWeight] = useState(0);
    const [moderateWeight, setModerateWeight] = useState(0);
    const [lightWeight, setLightWeight] = useState(0);

    console.log(userName);
    useEffect(() => {
    if(userData !== undefined && userData !== userCollectedData){
      
      setUserCollectedData(userData);
      setUserName(userData.name);
      setUserWeight(userData.weight)
      console.log("userData inside useEfffect",userCollectedData)
      setLoading(false)
      setError("successful data transfer") 
    } else {
        setError("no data!")
      }
    },[userName])
    
    function handleClick(){
      if(userData.reps > 0){
      const oneRepMax = Math.round((100 * userData.repWeight) / (101.3 - (2.67123 * userData.reps)));
      
      setOneRepMax(oneRepMax)
      const intenseWeight = oneRepMax * .87;
      setIntenseWeight(intenseWeight);
      const moderateWeight = oneRepMax * .80;
      setModerateWeight(moderateWeight);
      const lightWeight = oneRepMax * .73;
      setLightWeight(lightWeight);
      }
      setUserName(userData.name);
      setUserWeight(userData.weight);
      setUserAge(userData.age);
      setUserHeight(userData.height);
      setUserRepWeight(userData.repWeight);
      setUserReps(userData.reps);
    }

  while (userData !== undefined ){
  return (
    <div>
      <h2>Hello {userName}!</h2>
      <h4>Your One Rep Max is: {oneRepMax} lbs</h4>
      <h5>3-5 Reps at</h5>
      <p>Intense Weight: {intenseWeight} lbs</p>
      <h5>6-8 Reps at</h5>
      <p>Moderate Weight: {moderateWeight} lbs</p>
      <h5>10-12+ Reps at</h5>
      <p>Light Weight: {lightWeight} lbs</p>
      <button onClick={handleClick}>Evaluate</button>
    </div>
  )}
}

export default ListUserData