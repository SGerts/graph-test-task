import rawData from './json/bugs_for_test';

export const preparePlotData = async ({ date, system, criticality }) => {
  const filteredDate = rawData.filter(entry => {
    const [from, to] = date;
    const testDate = new Date(entry['Дата создания']);
    return (
      from.getTime() <= testDate.getTime() &&
      to.getTime() >= testDate.getTime() &&
      system === entry.System &&
      criticality === entry['Критичность']
    );
  });

  const mappedData = filteredDate.map(entry => {
    const date = new Date(entry['Дата создания']);
    const year = date.getFullYear();
    let month = date.getMonth();
    if (month < 10) {
      month = '0' + month;
    }
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

  let arr = [];
  Object.getOwnPropertyNames(plotData).forEach((prop, i) => {
    arr.push(plotData[[prop]]);
  });

  arr.sort((a, b) => a.name.localeCompare(b.name));

  // await new Promise(resolve => setTimeout(resolve, 1000));

  return arr;
};

export const prepareTableData = async (fstr) => {
  // await new Promise(resolve => setTimeout(resolve, 1000));
  const data = rawData || [];
  let columns = [];

  if (data.length > 0) {
    columns = Object.getOwnPropertyNames(data[0])
  }

  if (fstr && columns.length > 0) {
    return data.filter(entry => {
      return columns.some(col => {
        return entry[col] && entry[col].toString().match(fstr)
      });
    })
  } else {
    return rawData;
  }
};

const DATE_KEY = 'Дата создания';
const SYS_KEY = 'System';
const CRYT_KEY = 'Критичность';

// minDate, maxDate, crytList, systemTypeList
export function getInitialFormData() {
  const result = {
    minDate: null,
    maxDate: null,
    crytList: [],
    systemTypeList: []
  };

  rawData.reduce((prev, cur, idx) => {
    if (cur[DATE_KEY]) {
      const _date = new Date(cur[DATE_KEY]);
      if (!result.minDate || _date.getTime() < result.minDate.getTime()) result.minDate = _date;
      if (!result.maxDate || _date.getTime() > result.minDate.getTime()) result.maxDate = _date;
    }

    if (!prev.hasOwnProperty(cur[SYS_KEY])) {
      result.systemTypeList.push(cur[SYS_KEY]);
    }
    if (!prev.hasOwnProperty(cur[CRYT_KEY])) {
      result.crytList.push(cur[CRYT_KEY]);
    }

    return { ...prev, [cur[SYS_KEY]]: 1, [cur[CRYT_KEY]]: 1 }
  });

  return result;
}

const data = getInitialFormData();

export function getMinDate() {
  return data.minDate;
}

export function getMaxDate() {
  return data.maxDate;
}

export function getCriticalityList() {
  return data.crytList;
}

export function getSystemList() {
  return data.systemTypeList;
}
