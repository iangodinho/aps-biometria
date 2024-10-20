import React from 'react';
import * as C from './styles';
import { useLocation } from 'react-router-dom';
import logoMenu from '../../img/logo.png';
import lockGrayIcon from '../../img/lock-gray.svg'; // Ícone cinza para Grupos
import lockBlueIcon from '../../img/lock-blue.svg'; // Ícone azul para Grupos
import gearGrayIcon from '../../img/gear-gray.svg'; // Ícone cinza para Configurações
import gearBlueIcon from '../../img/gear-blue.svg'; // Ícone azul para Configurações
import speedometerGrayIcon from '../../img/speedometer-gray.svg'; // Ícone cinza para Dashboard
import speedometerBlueIcon from '../../img/speedometer-blue.svg'; // Ícone azul para Dashboard

const MenuLateral = () => {
  const location = useLocation(); // Hook do React Router para verificar a rota atual

  // Verifica se o usuário está nas páginas
  const isDashboardActive = location.pathname === '/dashboard';
  const isGruposActive = location.pathname === '/grupos';
  const isConfigActive = location.pathname === '/configuracoes';

  return (
    <C.MenuWrapper>
      <C.LogoWrapper>
        <img src={logoMenu} alt="Logo" width="250" height="auto" />
      </C.LogoWrapper>
      <C.CategoryTitle>INÍCIO</C.CategoryTitle>
      <C.MenuItem>
        <C.StyledNavLink to="/dashboard">
          <img
            src={isDashboardActive ? speedometerBlueIcon : speedometerGrayIcon} // Ícone dinâmico para Dashboard
            alt="Ícone de Dashboard"
            width="20"
            height="20"
            style={{ marginRight: '10px' }}
          />
          Dashboard
        </C.StyledNavLink>
      </C.MenuItem>

      <C.CategoryTitle>SEGURANÇA</C.CategoryTitle>
      <C.MenuItem>
        <C.StyledNavLink to="/grupos">
          <img
            src={isGruposActive ? lockBlueIcon : lockGrayIcon} // Ícone dinâmico para Grupos
            alt="Ícone de Grupos"
            width="20"
            height="20"
            style={{ marginRight: '10px' }}
          />
          Grupos
        </C.StyledNavLink>
      </C.MenuItem>

      <C.CategoryTitle>SISTEMA</C.CategoryTitle>
      <C.MenuItem>
        <C.StyledNavLink to="/configuracoes">
          <img
            src={isConfigActive ? gearBlueIcon : gearGrayIcon} // Ícone dinâmico para Configurações
            alt="Ícone de Configurações"
            width="20"
            height="20"
            style={{ marginRight: '10px' }}
          />
          Configurações
        </C.StyledNavLink>
      </C.MenuItem>
    </C.MenuWrapper>
  );
};

export default MenuLateral;
