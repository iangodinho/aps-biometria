import React from "react";
import { StyledButton } from "./styles";

const Button = ({ Text, onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      {Text}
    </StyledButton>
  );
};

export default Button;