import styled from "styled-components";

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #A2A2A2;

  input[type="checkbox"] {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border: 2px solid #A2A2A2;
    background-color: transparent;
    appearance: none; // Remover estilo padrão do checkbox
    cursor: pointer; // Certifique-se de que o cursor está como pointer

    &:checked {
      background-color: #A2A2A2; // Cor de fundo quando selecionado
      border: none; // Remover borda quando selecionado
    }

    &:checked::before {
      content: '✓'; // Adicionar o ícone de seleção
      display: block;
      text-align: center;
      color: #fff; // Cor do ícone de seleção
      font-size: 16px; // Tamanho do ícone
    }
  }
`;

export const CheckboxLabel = styled.label`
  cursor: pointer; // Adiciona um cursor pointer para o label
`;
