import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastItem } from './components/ForecastItem';
import { ErrorMessage } from './components/ErrorMessage';
import type { WeatherData, ForecastData } from './types/weather';
import { Thermometer } from 'lucide-react';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [city, setCity] = useState<string>(() => localStorage.getItem('lastCity') || '서울');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [bgClass, setBgClass] = useState<string>('from-blue-400 to-blue-600');

  const getBackground = (weatherId: number) => {
    if (weatherId >= 200 && weatherId < 300) return 'from-gray-700 to-gray-900'; // Thunderstorm
    if (weatherId >= 300 && weatherId < 500) return 'from-blue-700 to-blue-900'; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return 'from-gray-600 to-blue-800'; // Rain
    if (weatherId >= 600 && weatherId < 700) return 'from-blue-100 to-blue-300'; // Snow
    if (weatherId >= 700 && weatherId < 800) return 'from-gray-400 to-gray-600'; // Atmosphere
    if (weatherId === 800) return 'from-blue-400 to-blue-600'; // Clear
    return 'from-gray-400 to-blue-500'; // Clouds
  };

  const fetchWeather = async (searchCity: string) => {
    if (!searchCity) return;
    
    setLoading(true);
    setError('');

    try {
      // 1. Get Coordinates & Korean Name via Geocoding API
      const geoRes = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          q: searchCity,
          limit: 1,
          appid: API_KEY,
        },
      });

      if (!geoRes.data || geoRes.data.length === 0) {
        throw new Error('도시를 찾을 수 없습니다.');
      }

      const { lat, lon, local_names, name } = geoRes.data[0];
      const cityName = local_names?.ko || name || searchCity;

      // 2. Fetch Weather & Forecast using Coordinates
      const weatherRes = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
          lang: 'kr',
        },
      });

      const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
          lang: 'kr',
        },
      });

      const wData = weatherRes.data;
      setWeather({
        city: cityName, // Use the name from Geocoding API (Korean if available)
        temp: wData.main.temp,
        description: wData.weather[0].description,
        icon: wData.weather[0].icon,
        humidity: wData.main.humidity,
        windSpeed: wData.wind.speed,
      });

      setBgClass(getBackground(wData.weather[0].id));
      localStorage.setItem('lastCity', searchCity); // Save the search term

      // Process forecast data to get one entry per day (approx noon)
      const dailyForecast: ForecastData[] = [];
      const seenDates = new Set();
      
      forecastRes.data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toLocaleDateString('ko-KR', { weekday: 'short', month: 'short', day: 'numeric' });
        if (!seenDates.has(date) && dailyForecast.length < 5) {
          seenDates.add(date);
          dailyForecast.push({
            date,
            maxTemp: item.main.temp_max, // Note: This is 3-hour max, ideally we'd aggregate
            minTemp: item.main.temp_min,
            icon: item.weather[0].icon,
          });
        }
      });
      
      setForecast(dailyForecast);
      setCity(searchCity);

    } catch (err: any) {
      setError(err.response?.data?.message || err.message || '날씨 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (newCity: string) => {
    fetchWeather(newCity);
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  const convertTemp = (temp: number) => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };

  return (
    <div className={`min-h-screen bg-linear-to-br ${bgClass} transition-colors duration-1000 flex flex-col items-center py-10 px-4`}>
       {/* Background Overlay for better text contrast/glass effect */}
       <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl">
        <header className="flex justify-between items-center mb-8 text-white">
          <h1 className="text-3xl font-bold tracking-tight">날씨 대시보드</h1>
          <button 
            onClick={toggleUnit}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all font-semibold"
          >
            <Thermometer className="w-5 h-5" />
            <span>°{unit}</span>
          </button>
        </header>

        {/* 검색창(서치바) */}
        <SearchBar onSearch={handleSearch} isLoading={loading} />
        <ErrorMessage message={error} />

        {/* 로딩 스피너 */}
        {loading && !weather && (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}

        {/* 현재 날씨 */}
        {weather && (
          <div className="animate-slideUp">
            <CurrentWeather 
              data={{...weather, temp: convertTemp(weather.temp)}} 
              unit={unit} 
            />
            
            {/* 5일 예보 */}
            <div className="mt-8">
              <h3 className="text-xl text-white font-semibold mb-4 ml-2">5일 예보</h3>
              <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                {forecast.map((item, index) => (
                  <ForecastItem 
                    key={index} 
                    data={{
                      ...item, 
                      maxTemp: convertTemp(item.maxTemp),
                      minTemp: convertTemp(item.minTemp)
                    }} 
                    unit={unit} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
