const WeatherIcon = ({ type }: { type: WeatherDay["icon"] }) => {
  switch (type) {
    case "partly-cloudy":
      return (
        <div className="relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400 rounded-full blur-sm opacity-80"></div>
          <div className="relative w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="absolute bottom-2 right-0 w-12 h-10 bg-orange-400 rounded-full opacity-70"></div>
        </div>
      );
    case "rainy":
      return (
        <div className="relative">
          <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white/60 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
            <div className="w-1 h-4 bg-white/70 rounded-full"></div>
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      );
    case "thunderstorm":
      return (
        <div className="relative">
          <div className="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
            <div className="w-1 h-4 bg-white/70 rounded-full"></div>
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      );
    case "cloudy":
      return (
        <div className="relative">
          <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white/70 rounded-full"></div>
          </div>
        </div>
      );
    case "rainy-cloudy":
      return (
        <div className="relative">
          <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white/60 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
            <div className="w-1 h-4 bg-white/70 rounded-full"></div>
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      );
    case "snowy":
      return (
        <div className="relative">
          <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white/60 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className="w-1 h-2 bg-blue-200 rounded-full"></div>
            <div className="w-1 h-3 bg-blue-200 rounded-full"></div>
            <div className="w-1 h-2 bg-blue-200 rounded-full"></div>
          </div>
        </div>
      );
    case "foggy":
      return (
        <div className="relative">
          <div className="w-16 h-12 bg-white/50 rounded-[40%] flex items-center justify-center">
            <div className="w-12 h-8 bg-white/70 rounded-[40%]"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className="w-1 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      );
  }
};

export default WeatherIcon;