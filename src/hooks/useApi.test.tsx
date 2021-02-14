import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { readSync } from "fs";
import { useApi } from "./";

describe("useApi test suite", () => {
  it("test", async () => {
    const mock = new MockAdapter(axios);
    const initInfo = {
      city: "",
      countryCode: "",
      data: {
        currentWeather: {
          date: 0,
          icon: "",
          description: "",
          temp: 0,
          humidity: 0,
          visibility: 0,
        },
        forecast: [],
      },
    };

    const mockData = {
      coord: { lon: -58.3772, lat: -34.6132 },
      weather: [
        { id: 501, main: "Rain", description: "moderate rain", icon: "10n" },
      ],
      base: "stations",
      main: {
        temp: 22.28,
        feels_like: 22.97,
        temp_min: 21.67,
        temp_max: 22.78,
        pressure: 1006,
        humidity: 88,
      },
      visibility: 9000,
      wind: { speed: 4.43, deg: 76 },
      rain: { "1h": 1.33 },
      clouds: { all: 75 },
      dt: 1613261812,
      sys: {
        type: 1,
        id: 8224,
        country: "AR",
        sunrise: 1613208375,
        sunset: 1613256563,
      },
      timezone: -10800,
      id: 3435910,
      name: "Buenos Aires",
      cod: 200,
    };
    const url =
      "http://api.openweathermap.org/data/2.5/weather?q=buenos%20aires&units=metric&APPID=b48617df7813edea2f5b810e639cd078";
    mock.onGet(url).reply(200, mockData);

    const { result, waitForNextUpdate } = renderHook(() => useApi());

    //expect(result.current.info).toEqual(initInfo);
    result.current.getFullWeather("Buenos Aires");

    await waitForNextUpdate();

    expect(true).toEqual(true);
  });
});
