import React from 'react'
import Cards from '../Cards/Cards'
import '../Dashboard/Dashboard.css'
import { CustomTable } from '../Table/Table'
import { RightSide } from "../RightSide/RightSide";

const Dashboard = () => {
  return (
    <div className='dashboard'>
      
      <div className="MainDash">
        <div className='cardsTab'>
        <h1 className='textTitle'>Dashboard</h1>
          <Cards />
          <CustomTable />
        </div>
        <div className='grahp'>
          <RightSide />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
