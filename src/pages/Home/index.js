import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MenuLateral from '../../components/MenuLateral';
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
  flex: 1;
  padding: 20px;
`;

const Home = () => {
    return (
        <AppWrapper>
            <MenuLateral />
            <ConteudoWrapper>
                <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/grupos" element={<ListaGrupos />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/" element={<Signin />} />
                </Routes>
            </ConteudoWrapper>
        </AppWrapper>
  );
};

export default Home;