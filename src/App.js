import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth.js';
import GlobalStyle from './styles/global.js';
import useAuth from "./hooks/useAuth.js";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import styled from 'styled-components';

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

const App = () => {
    return (
      <AuthProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route exact path="/home" element={<Private Item={Home} />} />
            <Route path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Private Item={Signup} />} />
            <Route path="*" element={<Signin />} />
          </Routes>
        </Router>
      </AuthProvider>
    );
  };
  
  export default App
