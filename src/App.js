// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';

function App() {
  return (
    <React.Fragment>
      <Box width="400px"  sx={{width: { x1: '1448px'}}} m="auto">
        <Navbar /> 
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
        </Routes>
        <Footer />
      </Box>
    </React.Fragment>
  );
}

export default App;
