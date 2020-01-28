const config = require('config');

const baseURL = config.get('BaseURL');

async function fetchEmployee(url) {
  const requestConfig = {
    headers: {
      accept: 'application/json',
      'x-ibm-client-id': config.get('ClientID')
    }
  };
  const response = await fetch(url, requestConfig);
  const result = await response.json();
  if (result.search.entry.length === 0) {
    throw new Error('invalid request made');
  }
  return result.search.entry[0];
}

async function fetchEmployeeByEmail(id) {
  const url = `${baseURL}email/${id}/*`;
  return fetchEmployee(url);
}

async function fetchEmployeeByCnum(id) {
  const url = `${baseURL}cnum/${id}/*`;
  return fetchEmployee(url);
}

function getManagerSerial(employeeData) {
  const managerSerial = employeeData.attribute
    .filter(attribute => attribute.name === 'manager')[0]
    .value[0].split(',', 1)[0]
    .split('=')[1];
  return managerSerial;
}

function getName(employeeData) {
  const name = employeeData.attribute.filter(
    attribute => attribute.name === 'cn'
  )[0].value[0];
  return name;
}

function getSerialNum(employeeData) {
  const serialNum = employeeData.attribute.filter(
    attribute => attribute.name === 'ibmSerialNumber'
  )[0].value[0];
  return serialNum;
}

module.exports = {
  fetchEmployeeByEmail,
  fetchEmployeeByCnum,
  getManagerSerial,
  getName,
  getSerialNum
};
