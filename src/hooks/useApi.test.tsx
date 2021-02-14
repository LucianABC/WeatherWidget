import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useApi } from "./";
import fetchMock from "fetch-mock";
import { act } from "react-test-renderer";

describe("useApi test suite", () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });
  it("test", async () => {
    const { result } = renderHook(() => useApi());

    fetchMock.mock(
      "http://api.openweathermap.org/data/2.5/weather?q=new%20york&units=metric&APPID=b48617df7813edea2f5b810e639cd078",
      {
        returnedData: "foo",
      }
    );

    await act(async () => {
      result.current.getFullWeather("Buenos Aires");
    });

    expect(result.current.info).toBe({
      returnedData: "foo",
    });
  });
});
