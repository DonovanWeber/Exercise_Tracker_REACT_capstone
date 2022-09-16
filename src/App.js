// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <React.Fragment>
      <Box width="400px">
        <Navbar /> 
        <Header />

        <Footer />
      </Box>
    </React.Fragment>
  );
}

export default App;
