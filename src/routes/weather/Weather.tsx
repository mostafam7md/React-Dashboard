import { useState } from 'react'
import Card from '../../components/Card'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import { useWeather } from '../../hooks/useWeather'
import { z } from 'zod'

const citySchema = z.string().min(1, 'City is required')

export default function Weather() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined
  const { city, geo } = useWeather(apiKey || '')
  const [input, setInput] = useState('Cairo')
  const [err, setErr] = useState<string | null>(null)

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    const v = citySchema.safeParse(input)
    if (!v.success) { setErr(v.error.errors[0].message); return }
    try { await city.mutateAsync(v.data) } catch { setErr('City not found or error fetching data.') }
  }

  const onUseLocation = () => {
    setErr(null)
    if (!navigator.geolocation) { setErr('Geolocation not supported.'); return }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try { await geo.mutateAsync({ lat: pos.coords.latitude, lon: pos.coords.longitude }) }
      catch { setErr('Error fetching data for your location.') }
    }, () => setErr('Permission denied for geolocation.'))
  }

  const data = city.data || geo.data

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Weather</h2>
      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2 mb-4">
        <label className="sr-only" htmlFor="city">City</label>
        <input id="city" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter city..." className="input" />
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="button" onClick={onUseLocation} className="btn btn-ghost">Use my location</button>
      </form>
      {(city.isPending || geo.isPending) && <Loader label="Fetching weather..." />}
      {err && <ErrorState message={err} />}
      {data && !err && (
        <div className="flex items-center gap-4">
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
          <div>
            <h3 className="text-lg font-semibold">{data.name}</h3>
            <p>Temp: <b>{Math.round(data.main.temp)} °C</b></p>
            <p className="capitalize">Conditions: {data.weather[0].description}</p>
            <p>Humidity: {data.main.humidity}%</p>
          </div>
        </div>
      )}
    </Card>
  )
}
