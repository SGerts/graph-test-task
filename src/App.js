import React, { useReducer } from 'react'
import logo from './logo.svg';
import './App.css';
import { DateRangeInput, DateSingleInput, Datepicker } from '@datepicker-react/styled'
import Select from 'react-select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

const testData = [
  {
    "ID": 107,
    "System": "System2",
    "Summary": "just text",
    "Состояние": "Закрыт",
    "Найдено при": "SystemTest",
    "Критичность": "Средний",
    "Тип Дефекта": "ПО",
    "Дата создания": "2015-03-30 00:00:00.0000000",
    "Дата изменения": "2015-04-23 17:10:24.0000000",
    "Дата закрытия": null,
    "Метод обнаружения": "Не назначен",
    "reopens_amount": null
  },
  {
    "ID": 108,
    "System": "System2",
    "Summary": "just text",
    "Состояние": "Закрыт",
    "Найдено при": "SystemTest",
    "Критичность": "Средний",
    "Тип Дефекта": "ПО",
    "Дата создания": "2015-03-31 00:00:00.0000000",
    "Дата изменения": "2015-04-23 16:46:13.0000000",
    "Дата закрытия": null,
    "Метод обнаружения": "Не назначен",
    "reopens_amount": null
  },
  {
    "ID": 109,
    "System": "System2",
    "Summary": "just text",
    "Состояние": "Закрыт",
    "Найдено при": "SystemTest",
    "Критичность": "Высокий",
    "Тип Дефекта": "ПО",
    "Дата создания": "2015-03-31 00:00:00.0000000",
    "Дата изменения": "2015-08-10 14:32:40.0000000",
    "Дата закрытия": null,
    "Метод обнаружения": "Не назначен",
    "reopens_amount": null
  },
  {
    "ID": 110,
    "System": "System2",
    "Summary": "just text",
    "Состояние": "Отклонен исполнителем",
    "Найдено при": "SystemTest",
    "Критичность": "Высокий",
    "Тип Дефекта": "ПО",
    "Дата создания": "2015-03-31 00:00:00.0000000",
    "Дата изменения": "2016-02-26 09:19:38.0000000",
    "Дата закрытия": null,
    "Метод обнаружения": "Не назначен",
    "reopens_amount": "2"
  },
  {
    "ID": 111,
    "System": "System2",
    "Summary": "just text",
    "Состояние": "Закрыт",
    "Найдено при": "SystemTest",
    "Критичность": "Критический",
    "Тип Дефекта": "ПО",
    "Дата создания": "2015-03-31 00:00:00.0000000",
    "Дата изменения": "2015-08-10 14:34:50.0000000",
    "Дата закрытия": null,
    "Метод обнаружения": "Не назначен",
    "reopens_amount": null
  },
  {
    "ID": 112,
    "System": "System2",
    "Summary": "just text",
    "Состояние": "Закрыт",
    "Найдено при": "SystemTest",
    "Критичность": "Низкий",
    "Тип Дефекта": "ПО",
    "Дата создания": "2015-04-01 00:00:00.0000000",
    "Дата изменения": "2015-04-23 16:46:10.0000000",
    "Дата закрытия": null,
    "Метод обнаружения": "Не назначен",
    "reopens_amount": null
  }
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
        <div className="datapicker-container">
          <p className="title">What period of time?</p>

          <DateRangeInput
            onDatesChange={data => dispatch({ type: 'dateChange', payload: data })}
            onFocusChange={focusedInput => dispatch({ type: 'focusChange', payload: focusedInput })}
            startDate={state.startDate} // Date or null
            endDate={state.endDate} // Date or null
            focusedInput={state.focusedInput} // START_DATE, END_DATE or null
          />
        </div>
        <div className="select-container">
          <div className="select">
            <p className="title">Which system?</p>
            <Select options={systems} />
          </div>
          <div className="select">
            <p className="title">What is the criticality of defects?</p>
            <Select options={defType} />
          </div>
        </div>
        <div className="button-container">
          <button className="button">Build a graph</button>
        </div>
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
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 15 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}


