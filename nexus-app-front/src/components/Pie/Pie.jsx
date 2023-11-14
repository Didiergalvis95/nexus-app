import React from 'react'
import PieChart from './PieChart'
import './Pie.css'

export const Pie = () => {
  return (
    <div className="customPie">
    <div className='textCustomerp'>Recepcion Critica</div>
    <div className="customfullPie">
      <PieChart id="chart-pie"  legendVisibility height="full" />
    </div>
  </div>
  )
}
