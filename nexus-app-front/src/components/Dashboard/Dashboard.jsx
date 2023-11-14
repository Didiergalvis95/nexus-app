import React, { useEffect } from "react";
import "./Dashboard.css";
import { LineChartTemplate } from "../LineChart/LineChartTemplate";
import { Pie } from "../Pie/Pie";
import { CustomTable } from "../Table/Table";
import Cards from "../Cards/Cards";
import Buttons from "../Buttons/Buttons";
import { Welcome } from "../Welcome/Welcome";


const Dashboard = () => {
  return (
    <div className="dashboard-container">

      <div className="buttons-container">
        <Buttons />
      </div>
      <div className="text-dashboard">Dashboard</div>
      <div className="container-nose">
      <div className="section-container">
        <div className="welcome-container">
          <Welcome />
        </div>
        <div className="table-container">
          <CustomTable />
        </div>
        <div className="cards-container">
          <Cards />
        </div>
      </div>
      <div className="charts-container">
        <div className="pie-chart">
          <Pie />
        </div>
        <div className="line-chart">
          <LineChartTemplate />
        </div>
      </div>
      </div>

    </div>
  )
}

export default Dashboard