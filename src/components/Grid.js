import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Container style={{ width: '50%' }} className="justify-content-md-center">
      <Table striped bordered hover>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Nome</Th>
          <Th>Url Video</Th>
          <Th>Desc</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td>{item.id}</Td>
            <Td>{item.name}</Td>
            <Td><iframe width="380" height="260"  src={`https://www.youtube.com/embed/${item.url_video}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                frameborder='0'
                allow='autoplay; encrypted-media'
                allowfullscreen
                title='video'
                /></Td>
            <Td>{item.description}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
          
        ))}
      </Tbody>
    </Table>
    </Container>
    
  );
};

export default Grid;
