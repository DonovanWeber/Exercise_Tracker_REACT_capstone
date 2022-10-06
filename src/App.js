// import Logo from './logo.png';
import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoutes from './components/PrivateRoutes';
import Profile from './pages/Profile';
import ListUserData from './components/ListUserData';

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Box width="400px"  sx={{width: { x1: '1448px'}}} m="auto">
          <Navbar /> 
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path='/profile' element={<Profile />} />
              <Route path="/results" element={<ListUserData />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element= {<ExerciseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
          <Footer />
        </Box>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
