// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Box width="400px"  sx={{width: { x1: '1448px'}}} m="auto">
          <Navbar /> 
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </Box>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
