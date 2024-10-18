import React from 'react';
import styled from 'styled-components';

const ListaWrapper = styled.div`
  padding: 20px;
`;

const Grupo = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ecf0f1;
  border-radius: 4px;
`;

const ListaGrupos = () => {
  const grupos = ['Administrador', 'Diretor', 'Analista', 'Suporte', 'TI'];

  return (
    <ListaWrapper>
      {grupos.map((grupo, index) => (
        <Grupo key={index}>{grupo}</Grupo>
      ))}
    </ListaWrapper>
  );
};

export default ListaGrupos;
