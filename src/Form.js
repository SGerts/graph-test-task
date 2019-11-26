import React, { useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Select from 'react-select';
import { Button } from 'reactstrap';

import './form.css';
import {getMinDate, getMaxDate, getSystemList, getCriticalityList} from './service';

const criticalityList = getCriticalityList().map(value => ({ value, label: value }));
const systemList = getSystemList().map(value => ({ value, label: value }));

const Form = ({ onSubmit, loading, className }) => {

  const [date, setDate] = useState([getMinDate(), getMaxDate()]);
  const [system, setSystem] = useState(null);
  const [criticality, setCriticality] = useState(null);

  return (
    <div className={className}>
      <FormGroup style={{flexGrow: '0'}}>
        <Label>Период</Label>
        <div>
        <DateRangePicker
          onChange={setDate}
          value={date}
          disabled={loading}
        />
        </div>
      </FormGroup>

      <FormGroup>
        <Label>Система</Label>
        <Select
          options={systemList}
          onChange={ picked => {
            setSystem(picked.value);
          }}
          isDisabled={loading}
        />
      </FormGroup>

      <FormGroup>
        <Label>Критичность</Label>
        <Select
          options={criticalityList}
          onChange={ picked => {
            setCriticality(picked.value);
          }}
          isDisabled={loading}
        />
      </FormGroup>

      <FormGroup className='form-submit-group'>
        <Button
          onClick={() => onSubmit({ date, system, criticality }) }
          disabled={loading}
        >
          Построить график
        </Button>
      </FormGroup>
    </div>
  )
};

export default Form;
