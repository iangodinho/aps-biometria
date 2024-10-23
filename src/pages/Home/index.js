import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MenuLateral from '../../components/MenuLateral';
import Header from '../../components/Header';
import ListaGrupos from '../../components/ListaGrupos';
import Dashboard from './Dashboard';
import Configuracoes from './Configuracoes';
import * as C from "./styles";
import Signin from "../Signin";
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
                <Route path="/grupos" element={<ListaGrupos />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
              </Routes>
            </ConteudoWrapper>
        </AppWrapper>
  );
};

export default Home;