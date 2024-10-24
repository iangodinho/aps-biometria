import React, { useState } from "react";
import Input from "../../components/Input";
import ButtonForm from "../../components/ButtonForm";
import CheckboxRemember from "../../components/CheckboxRemember";
import ContainerForm from "../../components/ContainerForm";
import Logo from "../../components/Logo";
import Content from "../../components/Content";
import FormBox from "../../components/FormBox";
import Label from "../../components/Label";
import Strong from "../../components/Strong";
import ImageBox from "../../components/ImageBox";
import LabelError from "../../components/LabelError";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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
    <ContainerForm>
      <Logo/>
      <Content>
        <FormBox>
          <Label>Login no sistema</Label>
          <C.LabelSignup>
            Por favor, insira suas informações para fazer o login no sistema, ou
            <Strong>
              <Link to="/signup"> clique aqui </Link>
            </Strong>
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
          <CheckboxRemember id="lembrar" label="Lembrar de mim" />
          <LabelError>{error}</LabelError>
          <ButtonForm onClick={handleLogin}>
            Entrar
          </ButtonForm>
        </FormBox>
        <ImageBox/>
      </Content>
    </ContainerForm>
  );
};

export default Signin;