import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;  // Fundo branco
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
`;

export const Logo = styled.img`
  width: 350px;  // Aumentar tamanho do logo
  margin-top: 40px;
  margin-bottom: 20px;
  position: absolute;
  top: 20px;
`;

export const ImageBox = styled.img`
  width: 40%;  // Ajustar largura para 40%
  height: 100%;
  object-fit: cover;  // Preencher tamanho da caixa com a imagem
`;

export const FormBox = styled.div`
  width: 60%;  // Ajustar largura para 60%
  display: flex;
  flex-direction: column;
  align-items: flex-start;  // Alinhar componentes à esquerda
  padding: 50px;  // Aumentar espaço entre componentes
  background-color: #EAEAEA;  // Mudar cor da área do formulário
  border-radius: 15px 0px 0px 15px;
`;

export const Label = styled.label`
  font-size: 28px;
  font-weight: 600;
  color: #202020;
  margin-bottom: 10px;
`;

export const LabelSignup = styled.label`
  font-size: 17px;
  color: #202020;
  margin-bottom: 20px;  // Adicionar espaço abaixo do texto
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;
  font-size: 17px;

  a {
    text-decoration: none;
    color: #183EFF;  // Mudar cor do link para azul
    font-weight: bold;  // Deixar em negrito
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;  // Adicionar espaço abaixo do checkbox
  color: #A2A2A2;  // Mudar cor do texto e borda do checkbox

  input {
    margin-right: 10px;  // Espaço entre checkbox e label
    width: 20px;  // Aumentar tamanho do checkbox
    height: 20px;  // Aumentar tamanho do checkbox
    border: 2px solid #A2A2A2;  // Mudar borda do checkbox
    background-color: transparent;  // Remover preenchimento do checkbox
    appearance: none;  // Remover estilo padrão do checkbox

    &:checked {
      background-color: transparent;  // Garantir que continue sem preenchimento quando marcado
    }
  }
`;

export const Button = styled.button`
  background-color: #183EFF;  // Cor azul
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:after {
    content: '→';  // Adicionar setinha
    margin-left: 10px;
  }
`;

