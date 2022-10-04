import React, {useState, useEffect } from 'react'
import { collection, getDocs} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useAuth } from '../contexts/AuthContext'

function ListUserData(){
  const { currentUser } = useAuth();
  
  return (
    
  )
}

export default ListUserData