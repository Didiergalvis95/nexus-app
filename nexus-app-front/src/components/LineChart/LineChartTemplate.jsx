import React from 'react'
import LineChart from './LineChart'
import './Line.css'

export const LineChartTemplate = () => {
  return (
    <div className="customLine">
    <div>Sales customer</div>
    <div className="customLinew">
      <LineChart />
    </div>
  </div>
  )
}
