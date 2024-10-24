import React, { useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import ButtonForm from "../../components/ButtonForm";
import ContainerForm from "../../components/ContainerForm";
import Logo from "../../components/Logo";
import Content from "../../components/Content";
import FormBox from "../../components/FormBox";
import Label from "../../components/Label";
import Strong from "../../components/Strong";
import ImageBox from "../../components/ImageBox";
import LabelError from "../../components/LabelError";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const roles = ['Diretor', 'Coordenador', 'Analista'];

  const { signup } = useAuth();

  const handleSignup = () => {
    if (!email | !emailConf | !senha | !role) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(email, senha, role);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadatrado com sucesso!");
    navigate("/");
  };

  return (
    <ContainerForm>
      <Logo/>
      <Content>
        <FormBox>
          <Label>Cadastro no sistema</Label>
          <Input
            type="email"
            placeholder="Digite seu E-mail*"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="email"
            placeholder="Confirme seu E-mail*"
            value={emailConf}
            onChange={(e) => [setEmailConf(e.target.value), setError("")]}
          />
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={roles}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha*"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <LabelError>{error}</LabelError>
          <ButtonForm onClick={handleSignup}>
            Cadastrar
          </ButtonForm>
          <C.LabelSignin>
            Já tem uma conta?
            <Strong to="/signin">&nbsp;Entre</Strong>
          </C.LabelSignin>
        </FormBox>
        <ImageBox/>
      </Content>
    </ContainerForm>
  );
};

export default Signup;
