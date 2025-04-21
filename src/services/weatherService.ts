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
  try {
    // Try the current version of the OneCall API first
    const response = await fetch(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      // If the onecall endpoint fails, try the alternative approach with current weather and forecast
      // Fetch current weather
      const currentResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!currentResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const currentData = await currentResponse.json();
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      
      const forecastData = await forecastResponse.json();
      
      // Format the data to match our WeatherData interface
      const daily = forecastData.list
        .filter((_: any, i: number) => i % 8 === 0) // Get one forecast per day (every 8th item is 24 hours apart)
        .map((item: any) => ({
          dt: item.dt,
          temp: {
            day: item.main.temp
          },
          weather: item.weather
        }));
      
      return {
        current: {
          temp: currentData.main.temp,
          feels_like: currentData.main.feels_like,
          humidity: currentData.main.humidity,
          wind_speed: currentData.wind.speed,
          weather: currentData.weather
        },
        daily: daily
      };
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error('Failed to fetch weather data');
  }
};

// Fallback coordinates for Indian states in case the API can't find them
const stateCoordinates: Record<string, {lat: number, lon: number, name: string}> = {
  "Andhra Pradesh": { lat: 15.9129, lon: 79.7400, name: "Andhra Pradesh" },
  "Arunachal Pradesh": { lat: 27.1004, lon: 93.6167, name: "Arunachal Pradesh" },
  "Assam": { lat: 26.2006, lon: 92.9376, name: "Assam" },
  "Bihar": { lat: 25.0961, lon: 85.3131, name: "Bihar" },
  "Chhattisgarh": { lat: 21.2787, lon: 81.8661, name: "Chhattisgarh" },
  "Gujarat": { lat: 22.2587, lon: 71.1924, name: "Gujarat" },
  "Haryana": { lat: 29.0588, lon: 76.0856, name: "Haryana" },
  "Himachal Pradesh": { lat: 31.1048, lon: 77.1734, name: "Himachal Pradesh" },
  "Jammu & Kashmir": { lat: 33.7782, lon: 76.5762, name: "Jammu & Kashmir" },
  "Jharkhand": { lat: 23.6102, lon: 85.2799, name: "Jharkhand" },
  "Karnataka": { lat: 15.3173, lon: 75.7139, name: "Karnataka" },
  "Kerala": { lat: 10.8505, lon: 76.2711, name: "Kerala" },
  "Madhya Pradesh": { lat: 23.4733, lon: 77.9470, name: "Madhya Pradesh" },
  "Maharashtra": { lat: 19.7515, lon: 75.7139, name: "Maharashtra" },
  "Manipur": { lat: 24.6637, lon: 93.9063, name: "Manipur" },
  "Meghalaya": { lat: 25.4670, lon: 91.3662, name: "Meghalaya" },
  "Mizoram": { lat: 23.1645, lon: 92.9376, name: "Mizoram" },
  "Nagaland": { lat: 26.1584, lon: 94.5624, name: "Nagaland" },
  "Odisha": { lat: 20.9517, lon: 85.0985, name: "Odisha" },
  "Punjab": { lat: 31.1471, lon: 75.3412, name: "Punjab" },
  "Rajasthan": { lat: 27.0238, lon: 74.2179, name: "Rajasthan" },
  "Sikkim": { lat: 27.5330, lon: 88.5122, name: "Sikkim" },
  "Tamil Nadu": { lat: 11.1271, lon: 78.6569, name: "Tamil Nadu" },
  "Telangana": { lat: 18.1124, lon: 79.0193, name: "Telangana" },
  "Tripura": { lat: 23.9408, lon: 91.9882, name: "Tripura" },
  "Uttar Pradesh": { lat: 26.8467, lon: 80.9462, name: "Uttar Pradesh" },
  "Uttarakhand": { lat: 30.0668, lon: 79.0193, name: "Uttarakhand" },
  "West Bengal": { lat: 22.9868, lon: 87.8550, name: "West Bengal" }
};

export const getCityCoordinates = async (state: string) => {
  try {
    // First, check if we have fallback coordinates for this state
    if (stateCoordinates[state]) {
      // Get the state's capital or major city
      const stateData = stateCoordinates[state];
      return {
        lat: stateData.lat,
        lon: stateData.lon,
        name: stateData.name,
        country: "India"
      };
    }
    
    // If not in our fallback list, try API call
    const searchQuery = state + ", India";
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchQuery)}&limit=1&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location coordinates');
    }
    
    const data = await response.json();
    if (!data.length) {
      throw new Error('Location not found');
    }
    
    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      country: data[0].country,
    };
  } catch (error) {
    // If API call fails, use fallback data if available
    if (stateCoordinates[state]) {
      const stateData = stateCoordinates[state];
      return {
        lat: stateData.lat,
        lon: stateData.lon,
        name: stateData.name,
        country: "India"
      };
    }
    // If we get here, we have no fallback data either
    throw error;
  }
};
