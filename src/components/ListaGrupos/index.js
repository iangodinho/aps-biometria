import React, { useState } from 'react';
import Search from "../BarraBusca";
import {
  TableWrapper,
  TableContainer,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  Checkbox,
  PaginationWrapper,
  ArrowButton,
  RowsPerPageSelector,
  PaginationTextWrapper
} from './styles'; // Importando os estilos

const ListaGrupos = () => {
  const grupos = ['Administrador', 'Diretor', 'Analista', 'Suporte', 'TI'];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredGrupos = grupos.filter(grupo =>
    grupo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredGrupos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGrupos.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(currentItems.map((item) => item));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (grupo) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(grupo)
        ? prevSelected.filter((item) => item !== grupo)
        : [...prevSelected, grupo]
    );
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reseta para a primeira página ao mudar o número de itens
  };

  return (
    <TableContainer>
      <TableWrapper>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Table>
          <thead>
            <TableRow>
              <TableHeader>
                <Checkbox
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={currentItems.length > 0 && selectedItems.length === currentItems.length}
                />
              </TableHeader>
              <TableHeader>Nome</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {currentItems.map((grupo, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    type="checkbox"
                    checked={selectedItems.includes(grupo)}
                    onChange={() => handleCheckboxChange(grupo)}
                  />
                </TableCell>
                <TableCell>{grupo}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <PaginationWrapper>
          <PaginationTextWrapper>
            <span>Linhas por página</span>
            <RowsPerPageSelector onChange={handleItemsPerPageChange} value={itemsPerPage}>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="10">10</option>
            </RowsPerPageSelector>
          </PaginationTextWrapper>
          <ArrowButton disabled={currentPage === 1} onClick={handlePreviousPage}>
            &lt;
          </ArrowButton>
          <span>{currentPage} de {totalPages}</span>
          <ArrowButton disabled={currentPage === totalPages} onClick={handleNextPage}>
            &gt;
          </ArrowButton>
        </PaginationWrapper>
      </TableWrapper>
    </TableContainer>
  );
};

export default ListaGrupos;