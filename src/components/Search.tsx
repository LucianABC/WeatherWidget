import React, { FunctionComponent } from "react";
import styled from "styled-components";

export interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Search: FunctionComponent<Props> = ({
  handleChange,
  handleEnter,
  handleSubmit,
}) => {
  return (
    <Wrapper data-testid="search">
      <Input
        type="text"
        data-testid="input"
        onChange={handleChange}
        placeholder="Enter city..."
        onKeyDown={handleEnter}
      />
      <Button onClick={handleSubmit}>Search</Button>
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.div`
  border-radius: 8px;
  color: #fff;
  display: flex;
  font-size: 17px;
  height: 40px;
  justify-content: center;
  margin: 10px 0;
  overflow: hidden;
  width: 90%;
`;

const Input = styled.input`
  border-radius: 8px 0 0 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 16px;
  font-family: inherit;
  padding: 6px 12px;
  width: 60%;

  :focus {
    background: rgb(255 255 255 / 19%);
    outline: none;
  }
  ::placeholder {
    font-style: italic;
  }
`;

const Button = styled.button`
  border-radius: 0 8px 8px 0;
  width: 30%;
`;
