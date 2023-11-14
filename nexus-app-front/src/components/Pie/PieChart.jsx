import React from 'react';
import axios from 'axios';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip
} from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../Context/ContextProvider';

const PieChart = ({ id, legendVisiblity }) => {
  const peticion = "http://127.0.0.1:8000/dashboard/estadistica";

  const context = useStateContext();
  const currentMode = context ? context.currentMode : null;
  const [pieGraph, setPieGraph] = React.useState([]);

  const getPieGraph = async () => {
    try {
      const res = await axios.get(peticion);
      const filteredData = res.data.filter(item => item.tipo.nombre === "Recepcion Critica");
      setPieGraph(filteredData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  React.useEffect(() => {
    getPieGraph();
  }, []);

  return (
    <AccumulationChartComponent
      id={id}
      legendSettings={{ visible: legendVisiblity, background: '#494848' }}
      color='white'
      height="400px"
      width='800px'
      background={currentMode === 'Dark' ? '#33373E' : '#494848'}
      tooltip={{ enable: true }}
    >
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Sale"
          dataSource={pieGraph}
          xName="anime.nombre"
          yName="cantidad"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
              fontWeight: '600',
              color: '#fff',
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default PieChart;
