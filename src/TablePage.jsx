import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { Table, AutoSizer, Column } from 'react-virtualized';
import { prepareTableData } from './service';
import { TableContext } from './App';

const dateRenderer = ({ cellData }) => {

  return <span>{new Date(cellData).toLocaleDateString()}</span>
};

const TablePage = () => {

  const {table: data, setTable: setData, filter, setFilter} = useContext(TableContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function() {
      const _data = await prepareTableData(filter);
      setData(_data);
    })()
  }, []);

  const rowGetter = ({ index }) => {
    return data[index];
  };

  let timer = null;

  const doFilter = async (filter) => {
    setFilter(filter);
    setLoading(true);
    const _data = await prepareTableData(filter);
    setData(_data);
    setLoading(false);
  };

  const onFilter = async (filter, callNow) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (callNow) await doFilter(filter);
    else {
      timer = setTimeout(() => doFilter(filter), 500);
    }
  };

  const onFilterChange = async evt => {
    const filter = evt.target.value;
    await onFilter(filter, false);
  };

  const onFilterKeyUp = async evt => {
    if(evt.keyCode === 13){
      // evt.preventDefault();
      const filter = evt.target.value;
      await onFilter(filter, true);
    }
  };

  return (
    <>
      {loading && <div>Загрузка ...</div>}
      <div>
        <FormGroup>
          <Input
            type="text"
            name="filter"
            id="filter"
            placeholder="фильтр по всем колонкам"
            onChange={onFilterChange}
            onKeyUp={onFilterKeyUp}
            disabled={loading}
            defaultValue={filter}
          />
        </FormGroup>
      </div>
      <div style={{ flexBasis: '100%' }}>
        <AutoSizer>
          {({width, height}) => (
            <Table
              width={width}
              height={height}
              rowGetter={rowGetter}
              headerHeight={40}
              rowCount={data.length}
              rowHeight={40}
              headerClassName={''}
              rowClassName={''}
              disableHeader={false}
            >
              <Column dataKey='ID' width={100} label='ID' />
              <Column dataKey='System' width={100} label='System' flexGrow={1}/>
              <Column dataKey='Состояние' width={100} label='Состояние' flexGrow={1}/>
              <Column dataKey='Найдено при' width={100} label='Найдено при' flexGrow={1}/>
              <Column dataKey='Критичность' width={100} label='Критичность' flexGrow={1}/>
              <Column dataKey='Тип Дефекта' width={100} label='Тип Дефекта' flexGrow={1}/>
              <Column dataKey='Дата создания' width={100} label='Дата создания' flexGrow={1} cellRenderer={dateRenderer} />
              <Column dataKey='Дата изменения' width={100} label='Дата изменения' flexGrow={1} cellRenderer={dateRenderer} />
              <Column dataKey='Дата закрытия' width={100} label='Дата закрытия' flexGrow={1} cellRenderer={dateRenderer} />
              <Column dataKey='Метод обнаружения' width={100} label='Метод обнаружения' flexGrow={1}/>
              <Column dataKey='reopens_amount' width={100} label='reopens_amount' className={''} flexGrow={1}/>
            </Table>
          )}
        </AutoSizer>
      </div>
    </>
  )
};

export default TablePage;
