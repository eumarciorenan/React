import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  width: auto;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.url_video.value = onEdit.url_video;
      user.description.value = onEdit.description;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.name.value ||
      !user.url_video.value ||
      !user.description.value 
    
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          name: user.name.value,
          description: user.description.value,
          url_video: user.url_video.value,
          
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          name: user.name.value,
          description: user.description.value,
          url_video: user.url_video.value,
          
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.name.value = "";
    user.description.value = "";
    user.url_video.value = "";
   
    setOnEdit(null);
    getUsers();
  };

  return (
    <Container style={{ width: '50%' }} className="justify-content-md-center">
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <InputArea>
          <Label>Nome</Label>
          <Input name="name" />
        </InputArea>
        <InputArea>
          <Label>ID video </Label>
          <Input name="url_video" type="text" />
        </InputArea>
        <InputArea>
          <Label>Descricao</Label>
          <Input name="description" />
        </InputArea>
        <Button type="submit">SALVAR</Button>
      </FormContainer>
    </Container>
  );
};

export default Form;
