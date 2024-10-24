import React from 'react';
import ButtonExit from "../../../components/ButtonExit/index.js";
import useAuth from "../../../hooks/useAuth.js";
import { useNavigate } from 'react-router-dom';

const Configuracoes = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  return (
    <div>
      <h1>Configurações</h1>
      <ButtonExit Text="Sair" onClick={handleLogout}>
        Sair
      </ButtonExit>
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
