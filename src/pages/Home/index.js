import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import * as C from "./styles";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Form from "../../components/Form";
import Grid from "../../components/Grid";

import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    
    <C.Container>
      <C.Title>Cursos</C.Title>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
          <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
        <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>Sair</Button>
    </C.Container>
  );
};

export default Home;
