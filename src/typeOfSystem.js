import data from './json/bugs_for_test.json'

export default function(propertyName) {
    const arr = [];
    data.reduce((prev, cur, idx) => {
        if (prev.hasOwnProperty(cur[propertyName])) return prev
        else {
            arr.push({ value: cur[propertyName], label: cur[propertyName] })
            return {...prev, [cur[propertyName]]:1} 
        }
    }, {})
    return arr;
};

