import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../img/logo.png";
import image from "../../img/img-borda.png";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
<C.Container>
      <C.Logo src={logo} alt="Logo" />  {/* Adicione o logo aqui */}
      <C.Content>
        <C.FormBox>
          <C.Label>Login no sistema</C.Label>
          <C.LabelSignup>
            Por favor, insira suas informações para fazer o login no sistema, ou 
            <C.Strong>
              <Link to="/signup"> clique aqui </Link>
            </C.Strong>
            para se registrar
          </C.LabelSignup>
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.CheckboxContainer>
            <input type="checkbox" id="lembrar" />
            <label htmlFor="lembrar">Lembrar de mim</label>
          </C.CheckboxContainer>
          <C.labelError>{error}</C.labelError>
          <C.Button onClick={handleLogin}> 
          Entrar
          </C.Button>
        </C.FormBox>
        <C.ImageBox src={image} alt="Imagem" />
      </C.Content>
    </C.Container>
  );
};

export default Signin;