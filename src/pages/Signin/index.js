import React, { useState, useRef } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isReading, setIsReading] = useState(false);
  const portRef = useRef(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/login/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      console.log("Token recebido:", data.jwtToken);
      return { token: data.jwtToken };
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      return { error: error.message };
    }
  };

  const connectSerialPort = async () => {
    try {
      console.log("Solicitando conexão com a porta serial...");
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate: 9600 });
      portRef.current = selectedPort;
      console.log("Conexão com porta serial estabelecida.");
      setError(""); // Limpa erros anteriores
    } catch (error) {
      console.error("Erro ao conectar à porta serial:", error);
      setError("Erro ao conectar ao dispositivo de leitura");
    }
  };

  const closeSerialPort = async () => {
    if (portRef.current) {
      try {
        // Fecha o writer se estiver aberto
        if (portRef.current.writable) {
          await portRef.current.writable.getWriter().close();
        }
        // Fecha a porta serial
        await portRef.current.close();
        console.log("Porta serial fechada.");
      } catch (error) {
        console.error("Erro ao fechar a porta serial:", error);
      }
    }
  };

  const verifyFingerprintWithBackend = async (token, biometricId) => {
    try {
      console.log("Enviando ID da digital para verificação no backend...");
      const response = await fetch("http://localhost:8080/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ biometricId }),
      });

      if (response.ok) {
        console.log("Verificação da digital bem-sucedida.");
        return true;
      } else {
        // Tenta obter a mensagem de erro como texto
        let errorMessage = "Falha na verificação da digital";
        try {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        } catch (e) {
          console.error("Erro ao obter mensagem de erro:", e);
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Erro ao verificar a digital no backend:", error);
      setError(error.message || "Erro ao verificar a digital");
      return false;
    }
  };

  const readData = async (selectedPort, token) => {
    try {
      // Verifica se o stream já está travado e libera se necessário
      if (selectedPort.readable.locked) {
        console.log("Stream já está em uso. Liberando o stream anterior...");
        if (selectedPort.reader) {
          await selectedPort.reader.cancel();
          selectedPort.reader.releaseLock();
          selectedPort.reader = null;
        }
        if (selectedPort.decoder) {
          await selectedPort.decoder.readable.cancel();
          await selectedPort.decoder.writable.getWriter().close();
          selectedPort.decoder = null;
        }
      }

      const decoder = new TextDecoderStream();
      selectedPort.decoder = decoder;
      const readableStreamClosed = selectedPort.readable
        .pipeTo(decoder.writable)
        .catch((err) => {
          console.error("Erro no pipeTo:", err);
        });
      const reader = decoder.readable.getReader();
      selectedPort.reader = reader;

      setIsReading(true);
      console.log("Iniciando leitura da digital...");

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log("Leitura da porta serial encerrada.");
          break;
        }
        if (value) {
          const parsedId = parseInt(value.trim());
          console.log("Valor lido da porta:", parsedId);

          if (isNaN(parsedId)) {
            console.error("ID da digital inválido:", value);
            setError("ID da digital inválido recebido.");
            continue; // Continua lendo
          }

          const verified = await verifyFingerprintWithBackend(token, parsedId);
          if (verified) {
            console.log("Acesso liberado!");
            await closeSerialPort();
            setIsReading(false); // Atualiza antes de navegar
            navigate("/dashboard");
            break;
          } else {
            console.log("Digital não verificada.");
            // Permite nova tentativa sem reiniciar a conexão
            break;
          }
        }
      }
    } catch (error) {
      console.error("Erro ao ler da porta serial:", error);
      setError("Erro ao ler do dispositivo");
    } finally {
      if (selectedPort.reader) {
        selectedPort.reader.releaseLock();
        selectedPort.reader = null;
      }

      if (selectedPort.decoder) {
        try {
          await selectedPort.decoder.readable.cancel();
          await selectedPort.decoder.writable.getWriter().close();
        } catch (e) {
          console.error("Erro ao fechar o decoder:", e);
        }
        selectedPort.decoder = null;
      }

      // Não aguardamos o pipeTo aqui para evitar promessas pendentes
      setIsReading(false);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    if (!portRef.current) {
      setError("Conecte o dispositivo antes de fazer login");
      return;
    }

    const res = await login(username, password);
    if (res.error) {
      setError(res.error);
      return;
    }

    setError("Aguardando leitura da digital...");

    if (!isReading) {
      await readData(portRef.current, res.token);
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
              placeholder="Digite sua senha"
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
            <ButtonForm onClick={handleLogin} disabled={isReading}>
              Entrar
            </ButtonForm>
            <ButtonForm onClick={connectSerialPort} disabled={isReading}>
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
