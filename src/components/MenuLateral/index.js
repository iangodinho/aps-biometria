import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
`;

const MenuItem = styled.div`
  margin: 20px 0;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;

const MenuLateral = () => {
  return (
    <MenuWrapper>
      <MenuItem>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Início</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/grupos" style={{ color: 'white', textDecoration: 'none' }}>Grupos</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/configuracoes" style={{ color: 'white', textDecoration: 'none' }}>Configurações</Link>
      </MenuItem>
    </MenuWrapper>
  );
};

export default MenuLateral;
