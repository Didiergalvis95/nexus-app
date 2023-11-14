import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Category, ColumnSeries, Legend, Tooltip } from '@syncfusion/ej2-react-charts';

import axios from 'axios';
import { useStateContext } from '../Context/ContextProvider';

const LineChart = () => {
  const peticion = "http://127.0.0.1:8000/dashboard/estadistica";

  const [graph, setGraph] = React.useState([]);

  const getColor = (index) => {
    const colors = ['#FF5733', '#FFD700', '#4CAF50', '#3366E6', '#9C27B0', '#FF9800', '#795548', '#607D8B'];
    return colors[index % colors.length];
  };

  const getGraph = async () => {
    try {
      const res = await axios.get(peticion);
      setGraph(res.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  React.useEffect(() => {
    getGraph();
  }, []);

  const impactoCulturalData = graph
    .filter(item => item.tipo.nombre === 'Impacto Cultural')
    .map((item, index) => ({
      x: item.anime.nombre,
      y: item.cantidad,
      fill: '#333',
      name: `Bar${index + 1}`,
    }));

  const LinePrimaryXAxis = {
    valueType: 'Category',
    majorGridLines: { width: 0 },
    background: 'white',
  };

  const LinePrimaryYAxis = {
    labelFormat: '{value}',
    minimum: 0,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  const context = useStateContext();
  const currentMode = context ? context.currentMode : null;

  return (
    <ChartComponent
      id="bar-chart"
      height="400px"
      color='white'
      width='700px'
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#494848'}
      legendSettings={{ background: '#494848' }}
    >
      <Inject services={[ColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={impactoCulturalData}
          xName="x"
          yName="y"
          name="Impacto Cultural"
          type="Column"
          marker={{ visible: true, width: 10, height: 10 }}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;


