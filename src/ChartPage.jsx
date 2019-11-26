import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AutoSizer } from 'react-virtualized';

import './charts.css';
import { preparePlotData } from './service';
import Form from './Form';

export const ChartPage = () => {

  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState([]);

  const onSubmit = (formParams) => {
    setLoading(true);
    preparePlotData(formParams).then(plotData => {
      setPlot(plotData);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
    })
  };

  return (
    <div className='ChartPage'>
      <Form onSubmit={onSubmit} loading={loading} className='ChartPage__Form'/>

      <div className='ChartPage__ChartContainer'>
        <AutoSizer disableHeight={false} disableWidth={false}>
          {
            ({ width, height }) => (
              <LineChart
                width={width}
                height={height}
                data={plot}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="size" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            )
          }
        </AutoSizer>
      </div>

    </div>
  )
};

export default ChartPage;
