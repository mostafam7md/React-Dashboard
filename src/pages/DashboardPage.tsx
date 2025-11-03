import React from 'react'
import Layout from '../components/Layout'
import UsersCard from '../components/dashboard/UsersCard'
import NotesCard from '../components/dashboard/NotesCard'
import AnalyticsCard from '../components/dashboard/AnalyticsCard'
import WeatherCard from '../components/dashboard/WeatherCard'

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <UsersCard />
        <NotesCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalyticsCard />
        <WeatherCard />
      </div>
    </Layout>
  )
}

export default DashboardPage
