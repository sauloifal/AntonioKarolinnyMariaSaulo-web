import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  padding: 15px 20px;

  background-color: #fff;
  border-radius: 4px;

  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.75);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #2f2f2f;
  font-size: 18px;
  font-family: Helvetica, sans-serif;
`;

const Subtitle = styled.h1`
  color: #2f2f2f;
  font-size: 14px;
  font-family: Helvetica, sans-serif;
`;

const Input = styled.input`
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  outline: none;
`;

const Button = styled.button`
  padding: 8px 10px;
  background-color: #2899ec;
  border: none;
  border-radius: 4px;
  outline: none;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.75);
  margin: 10px 0 0 0;
  color: #ffff;
  font-weight: 600;
  cursor: pointer;
`;

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");

  function handleSearch() {
    if (!name) {
      alert("Insira um nome para continuar...");
      return;
    }
    axios.get(`https://api.nationalize.io/?name=${name}`).then((res) => {
      setData(res.data);
    });
  }

  return (
    <Container>
      {!data && (
        <Box>
          <Title>Nationality Predict App</Title>
          <Input
            placeholder="Insira seu nome"
            onChange={(v) => setName(v.target.value)}
          />
          <Button onClick={() => handleSearch()}>Buscar</Button>
        </Box>
      )}
      {data && (
        <Box>
          <Title>{data.name}</Title>
          {data.country.map((item) => (
            <>
              <Subtitle key={item.country_id}>
                {`País: ${item.country_id}`}
              </Subtitle>
              <Subtitle>{`Probabilidade: ${item.probability}`}</Subtitle>
            </>
          ))}
          <Button onClick={() => setData(null)}>Voltar</Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
