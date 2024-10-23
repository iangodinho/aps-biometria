import React from 'react';
import { HeaderWrapper, Icon, FlagImage } from './styles'; // Importando os estilos
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Pacote de ícones FontAwesome
import flagBR from '../../img/flag-br.png'; // Importando a imagem

const Header = () => {
  return (
    <HeaderWrapper>
      {/* Bandeira do Brasil */}
      <FlagImage src={flagBR} alt="Bandeira do Brasil" />

      {/* Ícones de notificação e perfil */}
      <Icon>
        <FaBell />
      </Icon>
      <Icon>
        <FaUserCircle />
      </Icon>
    </HeaderWrapper>
  );
};

export default Header;
