import React, { useReducer } from 'react'
import './App.css';
import Select from 'react-select'
import { DateRangeInput, DateSingleInput, Datepicker } from '@datepicker-react/styled'
import typeOfSystem from './typeOfSystem'

const typeSystem = typeOfSystem('System');
console.log(typeSystem);
const defType = typeOfSystem('Критичность');
console.log(defType);

const Form = () => {
    const onDatesChange = (data) => {console.log(data)};
    return (
        <div>
            <div className="datapicker-container"></div>
            <p className="title">What period of time?</p>
            <DateRangeInput
                onDatesChange={onDatesChange}
                //focusedInput={new Date()} // START_DATE, END_DATE or null
                startDate={new Date()} // Date or null
                endDate={new Date()} // Date or null
             />

            <div className="select-container">
                <div className="select">
                    <p className="title">Which system?</p>
                    <Select options={typeSystem} />
                </div>
                <div className="select">
                    <p className="title">What is the criticality of defects?</p>
                    <Select options={defType} />
                </div>
            </div>
            <div className="button-container">
                 <button className="button">Build a graph</button>
            </div>
        </div>
    )
}
export default Form;