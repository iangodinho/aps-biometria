import React from 'react';
import styled from 'styled-components';

const BotaoLogout = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const Configuracoes = () => {
  const handleLogout = () => {
    // lógica de logout aqui
  };

  return (
    <div>
      <h1>Configurações</h1>
      <BotaoLogout onClick={handleLogout}>Logout</BotaoLogout>
    </div>
  );
};

export default Configuracoes;
