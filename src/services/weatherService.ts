
const API_KEY = '8569062b62581123311b66e51d7e9dae';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      main: string;
      description: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      day: number;
    };
    weather: Array<{
      main: string;
    }>;
  }>;
}

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
};

export const getCityCoordinates = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch city coordinates');
  }
  
  const data = await response.json();
  if (!data.length) {
    throw new Error('City not found');
  }
  
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name,
    country: data[0].country,
  };
};
