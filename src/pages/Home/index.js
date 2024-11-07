import React from "react";
import { Route, Routes,  } from "react-router-dom";
import MenuLateral from '../../components/MenuLateral';
import Header from '../../components/Header';
import Dashboard from './Dashboard';
import CreatePostPage from './CreatePosts';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
`;

const ConteudoWrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
  padding-top: 70px;  // Adiciona um espaçamento no topo para compensar o header
  height: 100vh;      // Garante que o conteúdo ocupe toda a altura disponível
  overflow-y: auto;   // Habilita a rolagem se o conteúdo exceder a altura da página
`;

const Home = () => {
  return (
    <AppWrapper>
      <MenuLateral />
      <ConteudoWrapper>
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts" element={<CreatePostPage />} /> 
        </Routes>
      </ConteudoWrapper>
    </AppWrapper>
  );
};

export default Home;