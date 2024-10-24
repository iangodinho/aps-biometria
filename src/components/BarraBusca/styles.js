import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
`;

export const SearchBar = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  color: #B3B3B3;
  ::placeholder {
    color: #B3B3B3;
  }
  margin-left: 5px;
`;