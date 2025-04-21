
import { CalendarIcon, CloudRain, LeafIcon, MapPin } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <LeafIcon className="h-10 w-10 text-agri-green-500" />,
      title: "Crop Suggestions",
      description:
        "Get personalized crop suggestions based on soil conditions, weather patterns, and location data for optimal yield.",
    },
    {
      icon: <CloudRain className="h-10 w-10 text-agri-blue-500" />,
      title: "Weather Forecasts",
      description:
        "Access real-time weather information and forecasts specifically tailored for agricultural needs.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-agri-orange-500" />,
      title: "Market Prices",
      description:
        "Stay updated with current market prices for various crops to make informed decisions about selling your produce.",
    },
    {
      icon: <CalendarIcon className="h-10 w-10 text-agri-brown-500" />,
      title: "Government Schemes",
      description:
        "Get timely notifications about agricultural subsidies, loans, and government schemes designed for farmers.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Agricultural Solutions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Our platform provides farmers with essential tools and information to optimize 
            their agricultural practices and increase productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl p-6 shadow-md border border-gray-100"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
