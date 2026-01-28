import React from 'react';
import type { ForecastData } from '../types/weather';

interface ForecastItemProps {
  data: ForecastData;
  unit: 'C' | 'F';
}

export const ForecastItem: React.FC<ForecastItemProps> = ({ data }) => {
  return (
    <div className="min-w-[140px] bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-between border border-white/10 shadow-lg snap-start">
      <p className="font-medium text-white/90">{data.date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="날씨 아이콘"
        className="w-16 h-16 my-2 drop-shadow-md"
      />
      <div className="flex gap-2 text-white">
        <span className="font-bold">{Math.round(data.maxTemp)}°</span>
        <span className="opacity-60">{Math.round(data.minTemp)}°</span>
      </div>
    </div>
  );
};
