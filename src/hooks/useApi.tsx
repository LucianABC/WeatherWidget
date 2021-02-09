import { useState, useEffect } from "react";
import Axios from "axios";
import { Info, Forecast } from "../types";

type UseApi = (
  city: string
) => {
  getFullWeather: (city: string) => void;
  info: Info;
};

const apiBase: string = "http://api.openweathermap.org/data/2.5/";
const apiKey: string = "b48617df7813edea2f5b810e639cd078";

const useApi: UseApi = (city) => {
  const [info, setInfo] = useState<Info>({
    city: "",
    countryCode: "",
    data: {
      currentWeather: {
        date: new Date(),
        icon: "",
        description: "",
        temp: 0,
        humidity: 0,
        visibility: 0,
      },
      forecast: [],
    },
  });

  useEffect(() => {
    console.log("info", info);
  }, [info]);

  const getFullWeather = async (city: string) => {
    try {
      const resWeather = await Axios.get(
        ` ${apiBase}weather?q=${city}&units=metric&APPID=${apiKey}`
      );

      const resForecast = await Axios.get(
        `${apiBase}onecall?lat=${resWeather.data.coord.lat}&lon=${resWeather.data.coord.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}`
      );

      const forecast: Forecast[] = resForecast.data.daily.map((day: any) => {
        return {
          date: day.dt,
          icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
          description: day.weather.main,
          minTemp: day.temp.min,
          maxTemp: day.temp.max,
          humidity: day.humidity,
        };
      });

      setInfo({
        ...info,
        city: resWeather.data.name,
        countryCode: resWeather.data.sys.country,
        data: {
          ...info.data,
          currentWeather: {
            date: resWeather.data.dt,
            icon: `http://openweathermap.org/img/wn/${resWeather.data.weather[0].icon}@2x.png`,
            description: resWeather.data.weather[0].main,
            visibility: resWeather.data.visibility,
            temp: resWeather.data.main.temp,
            humidity: resWeather.data.main.humidity,
          },
          forecast,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getFullWeather,
    info,
  };
};

export default useApi;
