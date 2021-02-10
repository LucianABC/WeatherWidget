export interface Weather {
  date: number;
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

export interface FormattedDate {
  day: string;
  date: number;
  month: string;
  year: number;
}
