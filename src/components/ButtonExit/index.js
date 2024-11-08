import React from "react";
import { StyledButton } from "./styles";
import useAuth from "../../hooks/useAuth";  // Importe o hook useAuth
import { useNavigate } from "react-router-dom";  // Importe o hook useNavigate

const ButtonExit = ({ Text }) => {
  const { signout } = useAuth();  // Acesse a função signout do contexto de autenticação
  const navigate = useNavigate();  // Acesse o hook useNavigate para redirecionar

  const handleLogout = () => {
    signout();  // Chame a função signout para realizar o logout
    navigate("/signin");  // Redirecione para a página de signin
    window.location.reload();  // Recarrega a página automaticamente
  };

  return (
    <StyledButton type="button" onClick={handleLogout}>
      Sair
    </StyledButton>
  );
};

export default ButtonExit;
