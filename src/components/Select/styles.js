import styled from "styled-components";

export const Select = styled.select`
  outline: none;
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 5px;
  background-color: #f0f2f5;
  font-size: 16px;
  appearance: none; /* Para remover o estilo padrão do navegador */
  cursor: pointer;
  &.active {
    border-left: 5px solid gray;
  }
  &:hover {
    background-color: #f0f0f0;
  }
`