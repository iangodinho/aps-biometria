import React, { useState } from "react";
import {
  Container,
  Form,
  Input,
  TextArea,
  Select,
  Button,
  Label,
  Row,
} from "./styles";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [accessLevel, setAccessLevel] = useState("Usuário");
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const accessLevelMap = {
    "Ministro do Meio Ambiente": "ENVIRONMENTAL_MINISTER",
    "Diretor de Divisão": "DIVISION_DIRECTOR",
    "Usuário": "USER",
  };
  const mappedAccessLevel = accessLevelMap[accessLevel];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          accessLevel: mappedAccessLevel,
        }),
      });

      if (response.ok) {
        alert("Post criado com sucesso!");
      } else {
        alert("Erro ao criar post");
      }
    } catch (error) {
      setError("Erro ao criar post");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Adicionar título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Escrever conteúdo do post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Row>
          <Label>Quem pode ver a sua publicação?</Label>
          <Select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
          >
            <option value="Usuário">Usuário</option>
            <option value="Diretor de Divisão">Diretor de Divisão</option>
            <option value="Ministro do Meio Ambiente">
              Ministro do Meio Ambiente
            </option>
          </Select>
          <Button type="submit">Publicar</Button>
        </Row>
      </Form>
    </Container>
  );
};

export default CreatePost;
