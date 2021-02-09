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
