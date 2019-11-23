import React, { useState } from 'react'
import './App.css';
import Select from 'react-select'
import typeOfSystem from './typeOfSystem'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const typeSystem = typeOfSystem('System');
const defType = typeOfSystem('Критичность');

const Form = ({ onSubmit }) => {

  const [date, setDate] = useState(null);
  const [system, setSystem] = useState(null);
  const [defect, setDefect] = useState(null);

  console.log("DATE", date);
    const onDatesChange = (data) => {console.log(data)};
    return (
        <div>
            <div className="datapicker-container"></div>
            <p className="title">What period of time?</p>

          <DateRangePicker
            onChange={setDate}
            value={date}
          />

            <div className="select-container">
                <div className="select">
                    <p className="title">Which system?</p>
                    <Select
                      options={typeSystem}
                      onChange={ pickedSystem => {
                        setSystem(pickedSystem.value);
                      }}
                    />
                </div>
                <div className="select">
                    <p className="title">What is the criticality of defects?</p>
                    <Select
                      options={defType}
                      onChange={ pickedDefect => {
                        setDefect(pickedDefect.value);
                      }}
                    />
                </div>
            </div>
            <div className="button-container">
                 <button className="button" onClick={() => onSubmit({ date, system, defect }) }>Build a graph</button>
            </div>
        </div>
    )
}
export default Form;
