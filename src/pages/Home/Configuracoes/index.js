import React from 'react';
import styled from 'styled-components';
import Button from "../../../components/Button";
import { useAuth } from "../../../contexts/auth.js";
import { useNavigate } from 'react-router-dom';

const Configuracoes = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Configurações</h1>
      <Button Text="Sair" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  );
};

export default Configuracoes;



    // <C.Container>
    //   <C.Title>Home</C.Title>

    //   <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
    //     Sair
    //   </Button>
    // </C.Container>
