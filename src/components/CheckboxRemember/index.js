import React from "react";
import * as S from "./styles";

const CheckboxRemember = ({ id, label }) => (
  <S.CheckboxContainer>
    <input type="checkbox" id={id} />
    <S.CheckboxLabel htmlFor={id}>{label}</S.CheckboxLabel>
  </S.CheckboxContainer>
);

export default CheckboxRemember;
