import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const GovSchemes = () => {
  // Mock government schemes data with official website URLs
  const schemes = [
    {
      title: "PM-KISAN",
      description: "Income support of ₹6,000 per year to all farmer families across the country in three equal installments.",
      deadline: "Applications open year-round",
      category: "Financial Support",
      isNew: true,
      url: "https://pmkisan.gov.in/"
    },
    {
      title: "Soil Health Card Scheme",
      description: "Provides information on soil health to farmers. Assists them to improve productivity through judicious use of inputs.",
      deadline: "Seasonal registrations",
      category: "Resource Management",
      isNew: false,
      url: "https://soilhealth.dac.gov.in/"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Provides comprehensive insurance coverage against crop failure, helping farmers stabilize their income and ensure credit flow.",
      deadline: "Before crop sowing season",
      category: "Insurance",
      isNew: true,
      url: "https://pmfby.gov.in/"
    },
    {
      title: "National Mission for Sustainable Agriculture",
      description: "Promotes sustainable agriculture practices and efficient use of water through micro irrigation techniques.",
      deadline: "Ongoing",
      category: "Sustainability",
      isNew: false,
      url: "https://nmsa.dac.gov.in/"
    },
    {
      title: "Kisan Credit Card",
      description: "Provides farmers with affordable credit for their agricultural operations and other needs.",
      deadline: "Applications open year-round",
      category: "Financial Support",
      isNew: false,
      url: "https://www.India.gov.in/spotlight/kisan-credit-card-scheme"
    },
    {
      title: "Pradhan Mantri Krishi Sinchai Yojana",
      description: "Enhances water efficiency through 'Per Drop More Crop' and improves farm irrigation systems.",
      deadline: "Ongoing",
      category: "Irrigation",
      isNew: true,
      url: "https://pmksy.gov.in/"
    }
  ];

  return (
    <section id="gov-schemes" className="py-16 bg-agri-brown-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Government Schemes</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Stay updated with the latest agricultural schemes, subsidies, and initiatives offered by the government.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
                <a href={scheme.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button 
                    variant="outline" 
                    className="w-full border-agri-brown-500 text-agri-brown-700 hover:bg-agri-brown-500 hover:text-white flex items-center justify-center gap-2"
                  >
                    View Details
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovSchemes;
