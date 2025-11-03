import React, { useState } from "react";

type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

const API_KEY = "283a640171f90bfb03bab042bf6a2ab4";

const WeatherCard: React.FC = () => {
  const [city, setCity] = useState("Cairo");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByCity = async () => {
    if (!city.trim()) return;
    try {
      setLoading(true);
      setError(null);
      setData(null);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city.trim()
        )}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        setError("City not found or error fetching data");
        setLoading(false);
        return;
      }
      const json = (await res.json()) as WeatherData;
      setData(json);
    } catch (e) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const fetchByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          if (!res.ok) {
            setError("Error fetching data");
            setLoading(false);
            return;
          }
          const json = (await res.json()) as WeatherData;
          setData(json);
        } catch (e) {
          setError("Error fetching data");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Could not get your location");
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h2 className="font-semibold mb-2">Weather Widget</h2>
      <p className="text-xs text-slate-500 mb-3">
        Enter a city and view its current weather.
      </p>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 border rounded px-2 py-1 text-xs"
          placeholder="Enter city e.g. Cairo"
        />
        <button
          onClick={fetchByCity}
          className="bg-slate-900 text-white rounded px-3 text-xs"
        >
          Search
        </button>
      </div>
      <button
        onClick={fetchByLocation}
        className="text-[11px] text-slate-600 mb-2 self-start underline"
      >
        Use my current location
      </button>
      {loading && <p className="text-sm">Fetching weather...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {data && !loading && !error && (
        <div className="mt-2 text-sm flex items-center gap-3">
          <div>
            <p className="font-semibold text-base">{data.name}</p>
            <p className="text-xs capitalize">
              {data.weather[0]?.description ?? ""}
            </p>
            <p className="text-xs">
              Temp:{" "}
              <span className="font-semibold">
                {Math.round(data.main.temp)}°C
              </span>
            </p>
            <p className="text-xs">
              Humidity:{" "}
              <span className="font-semibold">{data.main.humidity}%</span>
            </p>
          </div>
          {data.weather[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              className="w-16 h-16"
            />
          )}
        </div>
      )}
      <p className="mt-3 text-[10px] text-slate-400">
        Replace <code>YOUR_OPENWEATHER_API_KEY</code> with your real key from
        OpenWeatherMap.
      </p>
    </div>
  );
};

export default WeatherCard;
