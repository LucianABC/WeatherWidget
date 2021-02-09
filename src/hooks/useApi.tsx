import { useState, useEffect } from "react";
import Axios from "axios";

export interface Weather {
  date: Date;
  icon: string;
  description: string;
  temp?: number;
  humidity: number;
  visibility?: number;
}

export interface Forecast extends Weather {
  maxTemp: number;
  minTemp: number;
}
export interface Info {
  city: string;
  countryCode: string;
  data: {
    currentWeather: Weather;
    forecast: Forecast[];
  };
}

export interface Coord {
  lat: number;
  lon: number;
}

type UseApi = (
  city: string
) => {
  getFullWeather: (city: string) => void;
  info: Info;
};

const apiBase: string = "http://api.openweathermap.org/data/2.5/";
const apiKey: string = "b48617df7813edea2f5b810e639cd078";

const useApi: UseApi = (city) => {
  const [coord, setCoord] = useState<Coord>({
    lon: -58.3772,
    lat: -34.6132,
  });

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

  const getCurrentWeather = async (city: string) => {
    try {
      const res = await Axios.get(
        ` ${apiBase}weather?q=${city}&units=metric&APPID=${apiKey}`
      );
      const { data } = res;
      console.log("Weather res", data);

      setCoord({ lon: data.coord.lon, lat: data.coord.lat });
      setInfo({
        ...info,
        city: data.name,
        countryCode: data.sys.country,
        data: {
          ...info.data,
          currentWeather: {
            date: data.dt,
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

  const getFullWeather = async (city: string) => {
    await getCurrentWeather(city);
    try {
      const res = await Axios.get(
        `${apiBase}onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}`
      );
      const { data } = res;
      console.log("Forecast res", data);

      const forecast: Forecast[] = data.daily.map((day: any) => {
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
        data: { ...info.data, forecast },
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
