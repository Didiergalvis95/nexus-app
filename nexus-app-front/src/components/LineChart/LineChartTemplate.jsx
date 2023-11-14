import React from 'react'
import LineChart from './LineChart'
import './Line.css'

export const LineChartTemplate = () => {
  return (
    <div className="customLine">
    <div className='textCustomer'>Impacto Cultural</div>
    <div className="customLinew">
      <LineChart />
    </div>
  </div>
  )
}
