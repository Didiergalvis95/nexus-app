import React from 'react'
import Cards from '../Cards/Cards'
import '../Dashboard/Dashboard.css'
import   { CustomTable }  from '../Table/Table'

const Dashboard = () => {
  return (
    <div>
       <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      
    <CustomTable />
    </div>
    </div>
  )
}

export default Dashboard
