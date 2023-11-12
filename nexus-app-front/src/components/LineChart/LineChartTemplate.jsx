import React from 'react'
import LineChart from './LineChart'
import './Line.css'

export const LineChartTemplate = () => {
  return (
    <div className="custom-margin-small custom-margin-medium custom-margin-large custom-margin-top custom-padding custom-bg-white custom-bg-dark rounded-custom">
    <div>Sales customer</div>
    <div className="custom-full-width">
      <LineChart />
    </div>
  </div>
  )
}
