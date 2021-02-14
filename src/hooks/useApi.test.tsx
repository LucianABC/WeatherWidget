import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useApi } from "./";
import { mockDataForecast, mockData, mockInfo } from "../utils/mockResponses";

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

    mock.onGet(/^(.)*(\/weather)+/g).reply(200, mockData);
    mock
      .onGet(/^(.)*(\/onecall)+/g)
      .reply(200, JSON.stringify(mockDataForecast));

    const { result, waitForNextUpdate } = renderHook(() => useApi());

    expect(result.current.info).toEqual(initInfo);

    result.current.getFullWeather("New York");
    await waitForNextUpdate();

    expect(result.current.info).toEqual(mockInfo);
  });
});
