export interface WeatherData {
  city: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface ForecastData {
  date: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
}
