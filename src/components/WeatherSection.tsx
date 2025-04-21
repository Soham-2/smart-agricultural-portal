
import { CloudRain, CloudSun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WeatherSection = () => {
  // Mock weather data
  const weatherData = [
    { day: "Mon", temp: "32°C", condition: "Sunny", icon: <CloudSun className="h-8 w-8 text-agri-orange-500" /> },
    { day: "Tue", temp: "30°C", condition: "Sunny", icon: <CloudSun className="h-8 w-8 text-agri-orange-500" /> },
    { day: "Wed", temp: "28°C", condition: "Cloudy", icon: <CloudSun className="h-8 w-8 text-gray-400" /> },
    { day: "Thu", temp: "25°C", condition: "Rainy", icon: <CloudRain className="h-8 w-8 text-agri-blue-500" /> },
    { day: "Fri", temp: "27°C", condition: "Cloudy", icon: <CloudSun className="h-8 w-8 text-gray-400" /> },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Weather Forecast</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Stay informed with the latest weather conditions and forecasts for your region to plan your farming activities accordingly.
          </p>
        </div>

        <Card className="overflow-hidden border-t-4 border-t-agri-blue-500 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">New Delhi, India</h3>
                <p className="text-gray-500">Current Location</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900">32°C</div>
                <p className="text-gray-500">Feels like 34°C</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <CloudSun className="h-14 w-14 text-agri-orange-500" />
              <div>
                <div className="text-xl font-medium">Sunny</div>
                <p className="text-gray-500">Wind: 10 km/h | Humidity: 65%</p>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Updated: Today, 2:30 PM
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {weatherData.map((day, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className="font-medium text-lg mb-2">{day.day}</div>
                <div className="mb-2 flex justify-center">
                  {day.icon}
                </div>
                <div className="font-bold text-xl mb-1">{day.temp}</div>
                <div className="text-gray-500 text-sm">{day.condition}</div>
              </CardContent>
            </Card>
          ))}
        </div>

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
