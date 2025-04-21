
import { CloudRain, CloudSun, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getWeatherData, getCityCoordinates, type WeatherData } from "@/services/weatherService";
import { toast } from "@/components/ui/sonner";

const WeatherSection = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{ name: string; country: string } | null>(null);

  const handleSearch = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    try {
      const coords = await getCityCoordinates(city);
      const weather = await getWeatherData(coords.lat, coords.lon);
      setWeatherData(weather);
      setLocation({ name: coords.name, country: coords.country });
      setCity("");
    } catch (error) {
      toast.error("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'rain':
        return <CloudRain className="h-8 w-8 text-agri-blue-500" />;
      default:
        return <CloudSun className="h-8 w-8 text-agri-orange-500" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Weather Forecast</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Stay informed with the latest weather conditions and forecasts for your region to plan your farming activities accordingly.
          </p>
        </div>

        <div className="flex gap-4 mb-8 max-w-md mx-auto">
          <Input
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-agri-blue-500 hover:bg-agri-blue-600"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {weatherData && location && (
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
                {getWeatherIcon(weatherData.current.weather[0].main)}
                <div>
                  <div className="text-xl font-medium">{weatherData.current.weather[0].main}</div>
                  <p className="text-gray-500">
                    Wind: {Math.round(weatherData.current.wind_speed)} km/h | 
                    Humidity: {weatherData.current.humidity}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {weatherData && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {weatherData.daily.slice(1, 6).map((day, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-4">
                  <div className="font-medium text-lg mb-2">
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="mb-2 flex justify-center">
                    {getWeatherIcon(day.weather[0].main)}
                  </div>
                  <div className="font-bold text-xl mb-1">
                    {Math.round(day.temp.day)}°C
                  </div>
                  <div className="text-gray-500 text-sm">
                    {day.weather[0].main}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <a 
            href="/weather" 
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
