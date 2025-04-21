
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MarketPrices = () => {
  // Mock market price data
  const marketData = [
    { crop: "Rice", variety: "Basmati", pricePerQuintal: "₹3,800", change: "+2.5%", trend: "up" },
    { crop: "Wheat", variety: "Durum", pricePerQuintal: "₹2,150", change: "-1.2%", trend: "down" },
    { crop: "Maize", variety: "Yellow", pricePerQuintal: "₹1,950", change: "+0.8%", trend: "up" },
    { crop: "Soybean", variety: "Regular", pricePerQuintal: "₹4,200", change: "+3.7%", trend: "up" },
    { crop: "Cotton", variety: "Long Staple", pricePerQuintal: "₹6,500", change: "-0.5%", trend: "down" },
  ];

  return (
    <section className="py-16 bg-white">
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
              <p className="text-sm text-gray-500">Last updated: Today, 9:30 AM</p>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Variety</TableHead>
                    <TableHead>Price (per quintal)</TableHead>
                    <TableHead>24h Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.crop}</TableCell>
                      <TableCell>{item.variety}</TableCell>
                      <TableCell>{item.pricePerQuintal}</TableCell>
                      <TableCell className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                        {item.change}
                        {item.trend === "up" ? (
                          <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
                href="/market-prices" 
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
