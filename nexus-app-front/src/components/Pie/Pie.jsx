import React from 'react'
import { pieChartData } from '../../data/Data'
import PieChart from './PieChart'
import './Pie.css'

export const Pie = () => {
  return (
    <div className="customPie">
    <div>Sales customer</div>
    <div className="customfullPie">
      <PieChart id="chart-pie" data={pieChartData} legendVisibility height="full" />
    </div>
  </div>
  )
}
