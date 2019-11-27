import React, { useState, useContext, useEffect } from 'react';
import { FormGroup, Label } from 'reactstrap';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Select from 'react-select';
import { Button } from 'reactstrap';

import './form.css';
import { getMinDate, getMaxDate, getSystemList, getCriticalityList } from './service';
import { FormContext } from './App';

const criticalityList = getCriticalityList().map(value => ({ value, label: value }));
const systemList = getSystemList().map(value => ({ value, label: value }));

const Form = ({ onSubmit, loading, className }) => {

  const { formValues, changeForm} = useContext(FormContext);
  const [error, setError] = useState(null);
  let tmr;
  const _setError = (err) => {
    setError(err);
    tmr = setTimeout(() => setError(null), 5000);
  };
  const _onSubmit = () => {
    if (tmr) {
      clearTimeout(tmr);
    }
    if (formValues.date && formValues.system && formValues.criticality) {
      onSubmit({ date: formValues.date, system: formValues.system.value, criticality: formValues.criticality.value });
    } else {
      _setError('Все поля должны быть заполнены.');
    }
  };

  useEffect(() => {
    return () => {
      if (tmr) {
        clearTimeout(tmr);
      }
    }
  }, []);

  return (
    <div className={className}>
      {error && <div style={{flexBasis: '100%', flexShrink: 0}}>{error}</div>}
      <FormGroup style={{flexGrow: '0'}}>
        <Label>Период</Label>
        <div>
        <DateRangePicker
          onChange={value => changeForm('date', value)}
          value={formValues.date}
          disabled={loading}
          minDate={getMinDate()}
          maxDate={getMaxDate()}
        />
        </div>
      </FormGroup>

      <FormGroup>
        <Label>Система</Label>
        <Select
          options={systemList}
          value={formValues.system}
          onChange={ picked => changeForm('system', picked)}
          isDisabled={loading}
        />
      </FormGroup>

      <FormGroup>
        <Label>Критичность</Label>
        <Select
          options={criticalityList}
          value={formValues.criticality}
          onChange={ picked => changeForm('criticality', picked)}
          isDisabled={loading}
        />
      </FormGroup>

      <FormGroup className='form-submit-group'>
        <Button
          onClick={_onSubmit}
          disabled={loading}
        >
          Построить график
        </Button>
      </FormGroup>
    </div>
  )
};

export default Form;
