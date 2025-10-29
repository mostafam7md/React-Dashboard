import { useMutation } from '@tanstack/react-query'
import { fetchWeatherByCity, fetchWeatherByGeo, WeatherResponse } from '../api/weather'
export function useWeather(apiKey:string){const city=useMutation<WeatherResponse,Error,string>({mutationFn:(name)=>fetchWeatherByCity(name,apiKey)});const geo=useMutation<WeatherResponse,Error,{lat:number;lon:number}>({mutationFn:({lat,lon})=>fetchWeatherByGeo(lat,lon,apiKey)});return {city,geo}}
