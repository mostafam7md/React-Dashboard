import axios from 'axios'
export type WeatherResponse={name:string;weather:{description:string;icon:string}[];main:{temp:number;humidity:number}}
const weatherClient=axios.create({baseURL:'https://api.openweathermap.org/data/2.5',timeout:15000})
export async function fetchWeatherByCity(city:string,apiKey:string):Promise<WeatherResponse>{const {data}=await weatherClient.get<WeatherResponse>('/weather',{params:{q:city,units:'metric',appid:apiKey}});return data}
export async function fetchWeatherByGeo(lat:number,lon:number,apiKey:string):Promise<WeatherResponse>{const {data}=await weatherClient.get<WeatherResponse>('/weather',{params:{lat,lon,units:'metric',appid:apiKey}});return data}
