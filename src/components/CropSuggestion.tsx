
import { LeafIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const CropSuggestion = () => {
  const [soilType, setSoilType] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<null | string[]>(null);

  // Mock function to suggest crops
  const suggestCrops = () => {
    if (!soilType || !location) return;

    // This would come from an API in a real application
    const mockSuggestions = {
      "Clay": ["Rice", "Wheat", "Oats", "Cabbage", "Broccoli"],
      "Sandy": ["Potatoes", "Carrots", "Lettuce", "Strawberries", "Melons"],
      "Silt": ["Tomatoes", "Peppers", "Cabbage", "Beans", "Peas"],
      "Loam": ["Corn", "Soybeans", "Wheat", "Sunflowers", "Cotton"],
    };

    // @ts-ignore - Mock data structure
    setSuggestions(mockSuggestions[soilType] || ["Wheat", "Rice", "Corn"]);
  };

  return (
    <section className="py-16 bg-agri-green-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Crop Suggestion System</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Get personalized crop recommendations based on your soil type, local weather conditions, and geographical location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-t-4 border-t-agri-green-500">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LeafIcon className="h-5 w-5 text-agri-green-500" />
                Input Your Farm Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soil Type
                  </label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clay">Clay</SelectItem>
                      <SelectItem value="Sandy">Sandy</SelectItem>
                      <SelectItem value="Silt">Silt</SelectItem>
                      <SelectItem value="Loam">Loam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <Input
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="w-full bg-agri-green-500 hover:bg-agri-green-600"
                  onClick={suggestCrops}
                >
                  Get Crop Suggestions
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Crops</h3>
              
              {!suggestions ? (
                <div className="text-center py-8 text-gray-500">
                  <LeafIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p>Enter your farm details to get personalized crop suggestions</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {suggestions.map((crop, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:border-agri-green-500 transition-colors">
                      <div className="w-12 h-12 bg-agri-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <LeafIcon className="h-6 w-6 text-agri-green-500" />
                      </div>
                      <div className="font-medium">{crop}</div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 text-center">
                <a 
                  href="/crop-suggestions" 
                  className="text-agri-green-700 hover:text-agri-green-800 inline-flex items-center gap-1"
                >
                  View detailed crop analysis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CropSuggestion;
