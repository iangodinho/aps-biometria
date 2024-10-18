import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import MenuLateral from '../../components/MenuLateral';
import ListaGrupos from '../../components/ListaGrupos';
import Dashboard from './Dashboard';
import Configuracoes from './Configuracoes';
import * as C from "./styles";
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
`;

const ConteudoWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <Router>
        <AppWrapper>
            <MenuLateral />
            <ConteudoWrapper>
                <Routes>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/grupos" component={ListaGrupos} />
                    <Route path="/configuracoes" component={Configuracoes} />
                </Routes>
            </ConteudoWrapper>
        </AppWrapper>
    </Router>
    // <C.Container>
    //   <C.Title>Home</C.Title>

    //   <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
    //     Sair
    //   </Button>
    // </C.Container>
  );
};

export default Home;