import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth.js';
import GlobalStyle from './styles/global.js';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import styled from 'styled-components';

const App = () => {
    return (
      <AuthProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    );
  };
  
  export default App
