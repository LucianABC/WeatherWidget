import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "../";
import { Info } from "../../types";

const initInfo: Info = {
  city: "Buenos Aires",
  countryCode: "AR",
  data: {
    currentWeather: {
      date: 1613239204,
      description: "few clouds",
      humidity: 78,
      icon: "http://openweathermap.org/img/wn/02d@2x.png",
      temp: 26.37,
      visibility: 10000,
    },
    forecast: [
      {
        date: 1613318400,
        description: "light rain",
        humidity: 52,
        icon: "http://openweathermap.org/img/wn/10d@2x.png",
        maxTemp: 28.35,
        minTemp: 22.34,
      },
      {
        date: 1613404800,
        description: "light rain",
        humidity: 54,
        icon: "http://openweathermap.org/img/wn/10d@2x.png",
        maxTemp: 28.24,
        minTemp: 20.42,
      },
      {
        date: 1613491200,
        description: "clear sky",
        humidity: 51,
        icon: "http://openweathermap.org/img/wn/01d@2x.png",
        maxTemp: 26.69,
        minTemp: 21.23,
      },
      {
        date: 1613577600,
        description: "clear sky",
        humidity: 45,
        icon: "http://openweathermap.org/img/wn/01d@2x.png",
        maxTemp: 27.56,
        minTemp: 19.5,
      },
      {
        date: 1613664000,
        description: "clear sky",
        humidity: 40,
        icon: "http://openweathermap.org/img/wn/01d@2x.png",
        maxTemp: 29.98,
        minTemp: 21.57,
      },
    ],
  },
};

const initProps = {
  handleChange: jest.fn(),
  handleEnter: jest.fn(),
  handleSubmit: jest.fn(),
  info: initInfo,
};

const component = (props?: any) => {
  render(<Card {...initProps} {...props} />);
};
describe("Card test suite", () => {
  it("should render the component correctly", () => {
    component();

    const weather = screen.getByTestId("card-weather");
    const select = screen.getByTestId("select");
    const search = screen.getByTestId("search");
    const forecast = screen.getByTestId("card-forecast");

    expect(screen.getByText("Saturday 13")).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(weather).toBeInTheDocument();
    expect(forecast).toBeInTheDocument();
  });
  it("should render the complete forecast correctly", () => {
    component();
    const forecast = screen.getAllByTestId("forecast-item");
    expect(forecast.length).toBe(5);
    expect(screen.getAllByText("light rain").length).toBe(2);
    expect(screen.getAllByText("clear sky").length).toBe(3);
    expect(screen.getAllByText("few clouds").length).toBe(1);
  });
  it("should render the complete London forecast correctly", () => {
    const newInfo: Info = {
      city: "London",
      countryCode: "GB",
      data: {
        currentWeather: {
          date: 1613241268,
          description: "overcast clouds",
          humidity: 51,
          icon: "http://openweathermap.org/img/wn/04n@2x.png",
          temp: 0.39,
          visibility: 10000,
        },
        forecast: [
          {
            date: 1613304000,
            description: "light rain",
            humidity: 75,
            icon: "http://openweathermap.org/img/wn/10d@2x.png",
            maxTemp: 4.05,
            minTemp: -0.34,
          },
          {
            date: 1613390400,
            description: "light rain",
            humidity: 92,
            icon: "http://openweathermap.org/img/wn/10d@2x.png",
            maxTemp: 10.71,
            minTemp: 4.26,
          },
          {
            date: 1613476800,
            description: "light rain",
            humidity: 80,
            icon: "http://openweathermap.org/img/wn/10d@2x.png",
            maxTemp: 10.98,
            minTemp: 7.06,
          },
          {
            date: 1613563200,
            description: "light rain",
            humidity: 77,
            icon: "http://openweathermap.org/img/wn/10d@2x.png",
            maxTemp: 10.5,
            minTemp: 6.49,
          },
          {
            date: 1613649600,
            description: "light rain",
            humidity: 60,
            icon: "http://openweathermap.org/img/wn/10d@2x.png",
            maxTemp: 8.7,
            minTemp: 5.72,
          },
        ],
      },
    };
    component({ info: newInfo });

    expect(screen.getAllByText("overcast clouds").length).toBe(1);
    expect(screen.getAllByText("light rain").length).toBe(5);
  });
});
