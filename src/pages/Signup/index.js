import React, { useState, useEffect } from "react";
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
import * as C from "./styles";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [accessLevel, setAccessLevel] = useState('');
  const [biometricId, setBiometricId] = useState(null);
  const navigate = useNavigate();
  const accessLevels = ['Administrador', 'Ministro do meio ambiente', 'Diretor de Divisão', 'Usuário'];
  const token = localStorage.getItem("token");
  let port = null;

  useEffect(() => {
    const readData = async () => {
      if (port && port.readable) {
        const decoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(decoder.writable);
        const reader = decoder.readable.getReader();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          const parsedId = parseInt(value.trim().replace("ID ", ""));
          if (!isNaN(parsedId)) {
            setBiometricId(parsedId); // Armazena o ID biométrico lido
            alert("Digital cadastrada com sucesso!");
            handleSignup(); // Chama o handleSignup após a leitura da digital
          }
        }
      }
    };

    readData().catch(error => {
      console.error("Erro na leitura da porta serial:", error);
    });

    return () => {
      if (port && port.readable) {
        port.close().catch(error => {
          console.error("Erro ao fechar a porta serial:", error);
        });
      }
    };
  }, [port]);

  const connectSerialPort = async () => {
    try {
      const ports = await navigator.serial.getPorts();
      port = await navigator.serial.requestPort(); // Solicita uma porta específica
      await port.open({ baudRate: 9600 }); // Abre a porta
      setError(""); // Limpa qualquer erro anterior
    } catch (error) {
      console.error("Erro ao conectar à porta serial:", error);
      setError("Erro ao conectar ao dispositivo de leitura");
    }
  };

  const signup = async (token, username, senha, biometricId, accessLevel) => {
    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, senha, biometricId, accessLevel }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar o usuário");
      }

      const data = await response.json();
      return { token: data.token };
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      return { error: error.message };
    }
  };

  const handleSignup = async () => {
    if (!username || !senha || !accessLevel || !biometricId) {
      setError("Preencha todos os campos e conecte sua digital");
      return;
    }

    const res = await signup(token, username, senha, biometricId, accessLevel);
    if (res.error) {
      setError(res.error);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  const initiateSignupProcess = () => {
    if (!username || !senha || !accessLevel) {
      setError("Preencha todos os campos antes de cadastrar");
      return;
    }
    connectSerialPort();
  };

  return (
    <ContainerForm>
      <Logo/>
      <Content>
        <FormBox>
          <Label>Cadastro no sistema</Label>
          <Input
            type="text"
            placeholder="Digite seu email*"
            value={username}
            onChange={(e) => [setUsername(e.target.value), setError("")]}
          />
          <Select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
            options={accessLevels}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha*"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <LabelError>{error}</LabelError>
          <div style={{ display: "flex", gap: "8px" }}>
            <ButtonForm onClick={initiateSignupProcess}>
              Cadastrar Usuário
            </ButtonForm>
          </div>
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
