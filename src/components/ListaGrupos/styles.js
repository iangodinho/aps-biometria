import styled from 'styled-components';

export const TableContainer = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  justify-content: center; /* Altera para 'flex-start' para evitar que a tabela fique muito baixa */
  align-items: center;
  padding: 20px;
  max-height: 100vh;
  background-color: #F0F2F5;
  overflow: hidden; /* Removendo qualquer overflow desnecessário */
`;

export const TableWrapper = styled.div`
  width: 60%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 0;
  display: flex;
  flex-direction: column;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

export const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
  color: #6c757d;
`;

export const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  color: #6c757d;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  color: #656565;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  color: #656565;
  font-size: 18px;
  cursor: pointer;
  margin: 0 10px;
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

export const RowsPerPageSelector = styled.select`
  padding: 5px;
  border: none;
  background-color: transparent;
  color: #656565;
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;
`;

export const PaginationTextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;