import React, { FunctionComponent, useState, useEffect } from "react";
import styled from "styled-components";
import { useApi } from "./hooks";
import { Card } from "./components";

const App: FunctionComponent = () => {
  const { getWeather, weather } = useApi("Buenos Aires");
  const [query, setQuery] = useState<string>("Buenos Aires");

  useEffect(() => {
    getWeather(query);
  }, []);

  const handleSubmit = () => {
    getWeather(query);
  };

  return (
    <Wrapper>
      {" "}
      <Card setQuery={setQuery} handleSubmit={handleSubmit} weather={weather} />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  align-items: flex-start;
  background: #000117;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 30px;
  height: 100%;
  @media (min-width: 600px) {
    align-items: center;
    height: 1040px;
  }
`;
