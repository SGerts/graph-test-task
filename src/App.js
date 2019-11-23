import React, {useState} from 'react'
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Form from './Form'
import rawData from './json/bugs_for_test';

export default function App() {


  const [plot, setPlot] = useState([]);

  const preparePlotData = ({ date, system, defect }) => {
    const filteredDate = rawData.filter(entry => {
      const [from, to] = date;
      const testDate = new Date(entry['Дата создания']);
      return (
        from.getTime() <= testDate.getTime() &&
        to.getTime() >= testDate.getTime() &&
        system === entry.System &&
        defect === entry['Критичность']
      );
    });

    const mappedData = filteredDate.map(entry => {
      const date = new Date(entry['Дата создания']);
      const year = date.getFullYear();
      const month = date.getMonth();
      return {...entry, bucket: '' + year + ',' + month};

    });

    const plotData = mappedData.reduce((prev, next) => {
      let bucket = prev[next.bucket];
      if (bucket) {
        bucket.size = bucket.size + 1;
      } else {
        bucket = {
          name: next.bucket,
          size: 1
        }
      }
      return {
        ...prev,
        [next.bucket]: bucket
      }
    }, {});

    const x = {
      "2019,01": { name: '2019,01', size: 10},
      "2019,02": { name: '2019,02', size: 30},

    }

    console.log(plotData);

    const arr = [];
    Object.getOwnPropertyNames(plotData).forEach((prop, i) => {
      arr.push(plotData[[prop]]);
    });
    console.log(arr);
    setPlot(arr);
  };


  return (
    <div className="app">
      <div className="header">
        <p>
          Sberbank test task
        </p>
       <Form onSubmit={ preparePlotData }/>
        
        <div className="chart-container">
          <LineChart
            width={500}
            height={300}
            data={plot}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="size" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>
    </div>
  );
}



   
