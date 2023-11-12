import React from 'react'
import { pieChartData } from '../../data/Data'
import PieChart from './PieChart'
import './Pie.css'

export const Pie = () => {
  return (
    <div className="custom-margin-small custom-margin-medium custom-margin-large custom-margin-top custom-padding custom-bg-white custom-bg-dark rounded-custom">
    <div>Sales customer</div>
    <div className="custom-full-width">
      <PieChart id="chart-pie" data={pieChartData} legendVisibility height="full" />
    </div>
  </div>
  )
}
