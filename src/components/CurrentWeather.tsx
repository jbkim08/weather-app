import React from 'react';
import type { WeatherData } from '../types/weather';
import { Droplets, Wind } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-xl border border-white/20 text-white transform hover:scale-[1.02] transition-transform duration-300">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">{data.city}</h2>
        <p className="text-lg capitalize opacity-90 mb-6">{data.description}</p>
        
        <div className="flex items-center justify-center mb-8">
          <img 
            src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
            alt={data.description}
            className="w-32 h-32 drop-shadow-lg"
          />
          <span className="text-7xl font-bold ml-4 tracking-tighter">
            {Math.round(data.temp)}°{unit}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl">
            <Droplets className="w-6 h-6 opacity-70" />
            <div>
              <p className="text-sm opacity-70">습도</p>
              <p className="font-semibold">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl">
            <Wind className="w-6 h-6 opacity-70" />
            <div>
              <p className="text-sm opacity-70">풍속</p>
              <p className="font-semibold">{Math.round(data.windSpeed)} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
