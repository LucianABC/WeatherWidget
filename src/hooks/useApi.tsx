import { useState, useEffect } from "react";
import Axios from "axios";

export interface Weather {
  city: string;
  countryCode: string;
  data: {
    currentWeather: {
      icon: string;
      description: string;
      temp: string;
      humidity: string;
      visibility: string;
    };
    forecast: [];
  };
}

export interface Coord {
  lat: number;
  lon: number;
}

type UseApi = (
  city: string
) => {
  getWeather: (city: string) => void;
  weather: Weather;
};

const apiBase: string = "http://api.openweathermap.org/data/2.5/";
const apiKey: string = "b48617df7813edea2f5b810e639cd078";

const useApi: UseApi = (city) => {
  const [coord, setCoord] = useState<Coord>({
    lon: -58.3772,
    lat: -34.6132,
  });

  const [weather, setWeather] = useState<Weather>({
    city: "",
    countryCode: "",
    data: {
      currentWeather: {
        icon: "",
        description: "",
        temp: "",
        humidity: "",
        visibility: "",
      },
      forecast: [],
    },
  });

  useEffect(() => {
    console.log("Coord", coord);
  }, [coord]);

  const getCurrentWeather = async (city: string) => {
    try {
      const res = await Axios.get(
        ` ${apiBase}weather?q=${city}&units=metric&APPID=${apiKey}`
      );
      const { data } = res;
      setCoord({ lon: data.coord.lon, lat: data.coord.lat });
      setWeather({
        ...weather,
        city: data.name,
        countryCode: data.country,
        data: {
          ...weather.data,
          currentWeather: {
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            description: data.weather[0].main,
            visibility: data.visibility,
            temp: data.main.temp,
            humidity: data.main.humidity,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getWeather = async (city: string) => {
    await getCurrentWeather(city);
    try {
      const res = await Axios.get(
        `${apiBase}onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}`
      );
      console.log("Weather res", res.data);
      const { data } = res;
      setWeather({
        ...weather,
        data: { ...weather.data, forecast: data.daily },
      });
    } catch {}
  };

  return {
    getWeather,

    weather,
  };
};

export default useApi;
