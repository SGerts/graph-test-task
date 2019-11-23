import React, { useReducer } from 'react'
import './App.css';
import { DateRangeInput, DateSingleInput, Datepicker } from '@datepicker-react/styled'
import Select from 'react-select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Form from './Form'

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
}

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, focusedInput: action.payload }
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}


const systems = [
  { value: 'system1', label: 'System1' },
  { value: 'system2', label: 'System2' },
]
const defType = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
]

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="app">
      <div className="header">
        <p>
          Sberbank test task
        </p>
       <Form/>
        
        <div className="chart-container">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}



   
