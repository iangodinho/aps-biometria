import React, { useState, useEffect } from "react";
import ButtonForm from "../../components/ButtonForm";
import Input from "../../components/Input";
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

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [error, setError] = useState("");
  const [fingerprintId, setFingerprintId] = useState(null);
  const navigate = useNavigate();
  let port = null; // Variável para armazenar a porta serial

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
            setFingerprintId(parsedId);
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

  // Função para conectar à porta serial
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

  // Função para autenticar o usuário
  const signin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/login/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username,password}),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      return { token: data.token };
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      return { error: error.message };
    }
  };

  // Função para verificar a digital com o backend
  const verifyFingerprintWithBackend = async (token, fingerprintId) => {
    try {
      const response = await fetch("http://localhost:8080/user/verify", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fingerprintId }),
      });

      if (!response.ok) {
        throw new Error("Erro na verificação da digital");
      }

      const result = await response.json();
      return result.verified;
    } catch (error) {
      console.error("Erro ao verificar a digital no backend:", error);
      setError("Erro ao verificar a digital");
      return false;
    }
  };

  // Função para lidar com o login
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signin(username, password);
    if (res.error) {
      setError(res.error);
      return;
    }

    localStorage.setItem("token", res.token);

    // Verifica a digital se ela estiver disponível
    if (fingerprintId !== null) {
      const verified = await verifyFingerprintWithBackend(res.token, fingerprintId);
      if (verified) {
        navigate("/dashboard"); // Redireciona após sucesso
      } else {
        setError("Falha na verificação da digital");
      }
    } else {
      setError("Aguardando leitura da digital...");
    }
  };

  return (
    <ContainerForm>
      <Logo />
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
            type="text"
            placeholder="Digite seu E-mail"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />
          <div style={{ position: "relative" }}>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <CheckboxRemember id="lembrar" label="Lembrar de mim" />
          <LabelError>{error}</LabelError>
          <div style={{ display: "flex", gap: "8px" }}>
            <ButtonForm onClick={handleLogin}>
              Entrar
            </ButtonForm>
            <ButtonForm onClick={connectSerialPort}>
              Conectar
            </ButtonForm>
          </div>
        </FormBox>
        <ImageBox />
      </Content>
    </ContainerForm>
  );
};

export default Signin;
