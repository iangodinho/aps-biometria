import React from "react";
import { HeaderWrapper, Icon, FlagImage } from "./styles"; // Importando os estilos
import { FaBell, FaUserCircle } from "react-icons/fa"; // Pacote de ícones FontAwesome
import flagBR from "../../img/flag-br.png"; // Importando a imagem
import ButtonExit from "../ButtonExit";

const Header = () => {
  return (
    <HeaderWrapper>
      <FlagImage src={flagBR} alt="Bandeira do Brasil" />
      <ButtonExit />
    </HeaderWrapper>
  );
};

export default Header;
