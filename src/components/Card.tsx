import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { Info, FormattedDate } from "../types";
import { formatDate } from "../utils/date";
import { Search } from "./";

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  info: Info;
}

const Card: FunctionComponent<Props> = ({ setQuery, handleSubmit, info }) => {
  const {
    city,
    countryCode,
    data: { currentWeather, forecast },
  } = info;
  const [currentDate, setCurrentDate] = useState<FormattedDate>();

  useEffect(() => {
    setCurrentDate(formatDate(currentWeather.date));
  }, [currentWeather]);

  return (
    <Wrapper>
      <Search setQuery={setQuery} handleSubmit={handleSubmit} />
      <Header>
        <h1>
          {city}, {countryCode}
        </h1>
        <h2>
          {currentDate?.month} {currentDate?.year}
        </h2>
      </Header>
      <WeatherContainer>
        <h4>
          {currentDate?.day} {currentDate?.date}
        </h4>
        <img src={currentWeather.icon} alt="" />
        <h3>{currentWeather.description}</h3>
        <h2>{currentWeather.temp}°C</h2>
      </WeatherContainer>
      <ForecastContainer>
        {forecast.map((day) => {
          const date = formatDate(day.date);
          return (
            <WeatherContainer key={date.date}>
              <h4>
                {" "}
                {date.day} {date.date}
              </h4>
              <img src={day.icon} alt="" />
              <h3>{day.description}</h3>

              <p>MIN: {day.minTemp}°C</p>
              <p>MAX: {day.maxTemp}°C</p>
            </WeatherContainer>
          );
        })}
      </ForecastContainer>
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
  padding: 7px;
  text-align: center;

  @media (min-width: 700px) {
    justify-content: space-between;
  }
`;

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  h1,
  h2 {
    margin: 3px;
  }
`;

const WeatherContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-transform: capitalize;
  margin: 15px 0;
  p {
    margin: 0;
  }
  h3,
  h4 {
    margin: 0 0 7px;
  }
`;

const ForecastContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  div {
    box-sizing: border-box;
    font-size: 12px;
    height: 200px;
    width: 33.33%;
    h3 {
      font-size: 11px;
    }
  }
`;
