import React from 'react';
import { NavLink } from 'react-router-dom';
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

  &.active {
    border-left: 5px solid gray;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;

  &.active {
    border-left: 5px solid gray;
  }
`;

const MenuLateral = () => {
  return (
    <MenuWrapper>
      <MenuItem>
        <StyledNavLink to="/dashboard">Início</StyledNavLink>
      </MenuItem>
      <MenuItem>
        <StyledNavLink to="/grupos">Grupos</StyledNavLink>
      </MenuItem>
      <MenuItem>
        <StyledNavLink to="/configuracoes">Configurações</StyledNavLink>
      </MenuItem>
    </MenuWrapper>
  );
};

export default MenuLateral;
