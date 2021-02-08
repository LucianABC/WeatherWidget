import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";

import { Search } from "./";

interface Props {
  //props
}

const Card: FunctionComponent<Props> = ({}) => {
  return (
    <Wrapper>
      <div>
        {
          //title
          //temp
          //etc
        }
      </div>
      <Search />
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  align-items: center;
  background: linear-gradient(180deg, rgb(6 10 35) 34%, rgb(50 57 84) 100%);
  border-radius: 8px;
  box-shadow: 0px 0px 20px 5px rgb(0 0 0 / 32%);
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 50%;
  overflow: hidden;
  padding: 15px;
  width: 100%;
  @media (min-width: 700px) {
    justify-content: space-between;
    width: 500px;
  }
`;
