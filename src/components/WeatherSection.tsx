import { CloudRain, CloudSun, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getWeatherData, getCityCoordinates, type WeatherData } from "@/services/weatherService";
import { toast } from "@/components/ui/sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WeatherSection = () => {
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{ name: string; country: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // List of all Indian states
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleStateChange = async (selectedState: string) => {
    setState(selectedState);
  };

  useEffect(() => {
    if (state) {
      fetchWeatherForState(state);
    }
  }, [state]);

  const fetchWeatherForState = async (selectedState: string) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCityCoordinates(selectedState);
      const weather = await getWeatherData(coords.lat, coords.lon);
      setWeatherData(weather);
      setLocation({ name: coords.name, country: coords.country });
    } catch (error) {
      console.error("Weather fetch error:", error);
      setError(`Unable to fetch weather data for ${selectedState}`);
      toast.error(`Failed to fetch weather data for ${selectedState}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        return <CloudRain className="h-8 w-8 text-agri-blue-500" />;
      case 'clouds':
        return <CloudSun className="h-8 w-8 text-gray-500" />;
      case 'clear':
        return <CloudSun className="h-8 w-8 text-agri-orange-500" />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudSun className="h-8 w-8 text-gray-400" />;
      case 'snow':
        return <CloudRain className="h-8 w-8 text-gray-300" />;
      default:
        return <CloudSun className="h-8 w-8 text-agri-orange-500" />;
    }
  };

  return (
    <section id="weather" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Weather Forecast</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Stay informed with the latest weather conditions and forecasts for your region to plan your farming activities accordingly.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <Select value={state} onValueChange={handleStateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((stateName) => (
                <SelectItem key={stateName} value={stateName}>
                  {stateName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p>Loading weather data...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8">
            <Card className="max-w-md mx-auto border-t-4 border-t-red-500">
              <CardContent className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-medium mb-2 text-red-600">Error</h3>
                <p className="text-gray-700">{error}</p>
                <p className="text-gray-500 mt-2">
                  Try selecting a different state or refresh the page.
                </p>
                <Button 
                  onClick={() => fetchWeatherForState(state)} 
                  className="mt-4 bg-agri-blue-500 hover:bg-agri-blue-600"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {!state && !loading && !error && (
          <div className="text-center py-8">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6 flex flex-col items-center">
                <MapPin className="h-12 w-12 text-agri-blue-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">Select a State</h3>
                <p className="text-gray-500">
                  Choose a state from the dropdown above to view current weather conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {weatherData && location && !loading && !error && (
          <Card className="overflow-hidden border-t-4 border-t-agri-blue-500 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{location.name}, {location.country}</h3>
                  <p className="text-gray-500">Current Location</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900">
                    {Math.round(weatherData.current.temp)}°C
                  </div>
                  <p className="text-gray-500">
                    Feels like {Math.round(weatherData.current.feels_like)}°C
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                {weatherData.current.weather && weatherData.current.weather[0] && 
                  getWeatherIcon(weatherData.current.weather[0].main)}
                <div>
                  <div className="text-xl font-medium">
                    {weatherData.current.weather && weatherData.current.weather[0] ? 
                      weatherData.current.weather[0].main : "Clear"}
                  </div>
                  <p className="text-gray-500">
                    Wind: {Math.round(weatherData.current.wind_speed)} km/h | 
                    Humidity: {weatherData.current.humidity}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {weatherData && !loading && !error && weatherData.daily && weatherData.daily.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {weatherData.daily.slice(0, 5).map((day, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-4">
                  <div className="font-medium text-lg mb-2">
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="mb-2 flex justify-center">
                    {day.weather && day.weather[0] ? 
                      getWeatherIcon(day.weather[0].main) : 
                      getWeatherIcon("Clear")}
                  </div>
                  <div className="font-bold text-xl mb-1">
                    {Math.round(day.temp.day)}°C
                  </div>
                  <div className="text-gray-500 text-sm">
                    {day.weather && day.weather[0] ? day.weather[0].main : "Clear"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <a 
            href="https://www.accuweather.com/en/in/india-weather" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-agri-blue-500 hover:text-agri-blue-800 inline-flex items-center gap-1"
          >
            View detailed weather information
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
