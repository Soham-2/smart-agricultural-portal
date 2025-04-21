import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Agricultural Portal</h1>
            <p className="text-lg md:text-xl mb-6 text-green-50">
              Empowering farmers with digital tools and real-time agricultural information
            </p>
            <p className="mb-8 text-green-100">
              Access crop suggestions, weather forecasts, market prices, and government 
              schemes - all in one centralized platform designed to bridge the gap between 
              technology and agriculture.
            </p>
          </div>
          <div className="hidden md:block relative">
            <div className="aspect-square max-w-md relative mx-auto">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" 
                alt="Agricultural field" 
                className="rounded-2xl shadow-xl object-cover w-full h-full transform rotate-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
