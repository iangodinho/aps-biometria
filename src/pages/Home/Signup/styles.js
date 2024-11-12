import styled from "styled-components";

export const LabelSignin = styled.label`
  font-size: 16px;
  color: #676767;
  margin-top: 10px;
`;

export const Select = styled.select`
  outline: none;
  width: 100%;
  padding: 12px 0px;
  border: none;
  border-bottom: 1px solid #202020;
  background-color: transparent;
  font-size: 18px;
  margin-bottom: 50px;
  color: #757575;
  cursor: pointer;
  &.active {
    border-left: 5px solid gray;
  }
  option {
    color: black; /* Cor das opções */
  }
  option:disabled {
    color: #a2a2a2; /* Cor das opções */
  }
`;
