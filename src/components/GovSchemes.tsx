
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const GovSchemes = () => {
  // Mock government schemes data
  const schemes = [
    {
      title: "PM-KISAN",
      description: "Income support of ₹6,000 per year to all farmer families across the country in three equal installments.",
      deadline: "Applications open year-round",
      category: "Financial Support",
      isNew: true,
    },
    {
      title: "Soil Health Card Scheme",
      description: "Provides information on soil health to farmers. Assists them to improve productivity through judicious use of inputs.",
      deadline: "Seasonal registrations",
      category: "Resource Management",
      isNew: false,
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Provides comprehensive insurance coverage against crop failure, helping farmers stabilize their income and ensure credit flow.",
      deadline: "Before crop sowing season",
      category: "Insurance",
      isNew: true,
    },
  ];

  return (
    <section className="py-16 bg-agri-brown-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Government Schemes</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Stay updated with the latest agricultural schemes, subsidies, and initiatives offered by the government.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {schemes.map((scheme, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{scheme.title}</CardTitle>
                    <CardDescription className="mt-1">{scheme.category}</CardDescription>
                  </div>
                  {scheme.isNew && (
                    <Badge className="bg-agri-green-500">New</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700 mb-4">{scheme.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">Deadline:</span> {scheme.deadline}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-agri-brown-500 text-agri-brown-700 hover:bg-agri-brown-500 hover:text-white"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-t-4 border-t-agri-brown-500">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">Stay Notified</h3>
                <p className="text-gray-600">
                  Receive timely updates about new government schemes, deadlines, and eligibility criteria directly on your device.
                </p>
              </div>
              <Button className="bg-agri-brown-500 hover:bg-agri-brown-600 whitespace-nowrap">
                Subscribe to Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GovSchemes;
