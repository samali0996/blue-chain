import {
  fetchEmployeeByEmail,
  fetchEmployeeByCnum,
  getManagerSerial,
  getName,
  getSerialNum
} from './Bluchain';

const config = require('config');
const fs = require('fs');

const samDataBody = JSON.parse(
  fs.readFileSync('./resources/sam-mock-email-data.json', 'utf8')
);
const samData = config.get('Sam');

const mikeDataBody = JSON.parse(
  fs.readFileSync('./resources/mike-moke-email-data.json', 'utf8')
);
const mikeData = config.get('Mike');

const ginniDataBody = JSON.parse(
  fs.readFileSync('./resources/ginni-mock-email-data.json', 'utf8')
);
const ginniData = config.get('Ginni');

test('canary test to check testing suite', () => {
  expect(true).toBe(true);
});

describe('fetching employee data', () => {
  test('from endpoint for sam from email', async () => {
    await expect(
      fetchEmployeeByEmail(samData.Email, 'email')
    ).resolves.toStrictEqual(samDataBody);
  });

  test('from endpoint for mike from email', async () => {
    await expect(
      fetchEmployeeByEmail(mikeData.Email, 'email')
    ).resolves.toStrictEqual(mikeDataBody);
  });

  test('from endpoint for mike from cnum', async () => {
    await expect(fetchEmployeeByCnum(mikeData.Serial)).resolves.toStrictEqual(
      mikeDataBody
    );
  });

  test('to throw an error if incorrect info is passed', async () => {
    await expect(fetchEmployeeByEmail(undefined)).rejects.toThrow();
  });
});

describe("getting manager's serial number", () => {
  test("of sam's manager", () => {
    expect(getManagerSerial(samDataBody)).toBe(samData.ManagerSerial);
  });

  test("of mike's manager", () => {
    expect(getManagerSerial(mikeDataBody)).toBe(mikeData.ManagerSerial);
  });

  test("of ginni's manager", () => {
    expect(getManagerSerial(ginniDataBody)).toBe(ginniData.ManagerSerial);
  });
});

describe('gets employee information', () => {
  test("gets sam's name from his data", () => {
    expect(getName(samDataBody)).toBe(samData.Name);
  });
  test("mike's name from his data", () => {
    expect(getName(mikeDataBody)).toBe(mikeData.Name);
  });
  test("gets sam's serial number", () => {
    expect(getSerialNum(samDataBody)).toBe(samData.Serial);
  });
});
