import React from "react";
import * as S from "./styles";
import lupaIcon from '../../img/search.png';

const Search = ({ searchTerm, setSearchTerm }) => {
  return <S.SearchBarWrapper>
  <img src={lupaIcon} alt="Buscar" style={{ marginRight: '10px', width: '20px' }} />
  <S.SearchBar
    type="text"
    placeholder="Buscar..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</S.SearchBarWrapper>
};

export default Search;
