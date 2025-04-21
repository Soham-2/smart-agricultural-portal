import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, RefreshCw } from "lucide-react";
import { fetchCropPrices, type CropPrice } from "@/services/marketService";

const MarketPrices = () => {
  const [marketData, setMarketData] = useState<CropPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  const fetchMarketPrices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch data from our service
      const data = await fetchCropPrices();
      
      if (data && data.length > 0) {
        setMarketData(data);
        
        // Set last updated time
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString());
      } else {
        throw new Error("No data received from API");
      }
    } catch (err) {
      console.error("Failed to fetch market prices:", err);
      setError("Unable to load real-time prices. Showing cached data instead.");
      
      // Still show whatever data we have, even if there was an error
      if (marketData.length === 0) {
        const fallbackData = await fetchCropPrices();
        setMarketData(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="market-prices" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Price Updates</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Stay informed about current crop prices in the market to make better selling decisions for your produce.
          </p>
        </div>

        <Card className="border-t-4 border-t-agri-orange-500 mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Current Crop Prices</h3>
              
              <div className="flex items-center">
                {error && (
                  <span className="text-amber-600 mr-2 text-sm hidden md:inline">
                    {error}
                  </span>
                )}
                
                <button 
                  onClick={fetchMarketPrices}
                  disabled={loading}
                  className="p-2 text-agri-orange-500 hover:text-agri-orange-700 transition-colors"
                  title="Refresh prices"
                >
                  <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                
                {lastUpdated && !loading && (
                  <span className="text-sm text-gray-500 ml-2 hidden md:inline">
                    Last updated: {lastUpdated}
                  </span>
                )}
              </div>
            </div>
            
            {loading && marketData.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-agri-orange-500" />
                <span className="ml-2 text-lg text-gray-600">Loading prices...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crop</TableHead>
                      <TableHead>Variety</TableHead>
                      <TableHead>Price (per quintal)</TableHead>
                      <TableHead>Market</TableHead>
                      <TableHead>State</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketData.length > 0 ? (
                      marketData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.crop}</TableCell>
                          <TableCell>{item.variety}</TableCell>
                          <TableCell>{item.pricePerQuintal}</TableCell>
                          <TableCell>{item.market}</TableCell>
                          <TableCell>{item.state}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No price data available at the moment. Please try again later.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {error && marketData.length > 0 && (
              <div className="mt-4 text-center md:hidden">
                <p className="text-amber-600 text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Major Markets</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Delhi Agricultural Market</li>
                <li>• Mumbai Wholesale Market</li>
                <li>• Kolkata Grain Market</li>
                <li>• Chennai Produce Exchange</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Price Trends</h4>
              <p className="text-gray-700">
                Overall crop prices have increased by 1.8% in the last week, with rice and soybean showing the strongest gains.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Market Updates</h4>
              <p className="text-gray-700">
                Get daily price notifications for your preferred crops directly on your phone or email.
              </p>
              <a 
                href="#market-prices" 
                className="text-agri-orange-500 hover:text-agri-orange-800 mt-2 inline-block"
              >
                Set up notifications
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketPrices;
