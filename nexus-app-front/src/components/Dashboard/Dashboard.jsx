import React, { useEffect } from "react";
import "./Dashboard.css";
import { LineChartTemplate } from "../LineChart/LineChartTemplate";
import { Pie } from "../Pie/Pie";
import { CustomTable } from "../Table/Table";
import Cards from "../Cards/Cards";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="cards-container">
        <Cards />
      </div>
      <div className="charts-container">
        <div className="line-chart">
          <LineChartTemplate />
        </div>
        <div className="pie-chart">
          <Pie />
        </div>
      </div>
      <div className="table-container">
        <CustomTable />
      </div>
    </div>
  );
};

export default Dashboard;

{/* <div className="dashboard">
<div className="MainDash">
  <div className="bags">
    <Welcome />
  </div>
  <div className="buttons-wond">
  <Buttons />
  </div>
</div>
</div> */}