import alasql from 'alasql';

import sortedCountryRegionsToProvinceStates from '../data/sortedCountryRegionsToProvinceStates.json';
import tableData from '../data/tableData.json';

/**
 * Name of the sql table.
 */
const CASES_TABLE_NAME = 'cases';

/**
 * Enumeration of available data series.
 */
const DATA_SERIES = Object.freeze({
  CONFIRMED: 'confirmed',
  DEATHS: 'deaths',
  RECOVERED: 'recovered'
});

/**
 * A sorted map that maps countries/regions to their corresponding provinces/states.
 */
const REGION_TO_SUB_REGION_MAP = Object.freeze(sortedCountryRegionsToProvinceStates);

function setup() {
  // Create the data table
  alasql(`
    CREATE TABLE ${CASES_TABLE_NAME} (
      provinceState STRING,
      countryRegion STRING,
      date DATE,
      ${Object.values(DATA_SERIES).map((series) => `${series} INT`).join(', ')}
    )
  `);

  // Prime the data for the table
  alasql.tables.cases.data = tableData;
}

function querySeriesData(countryRegion, provinceState) {
  let query = `
    SELECT date,
    ${Object.values(DATA_SERIES).map((series) => `sum(${series}) as ${series}`).join(', ')}
    FROM ${CASES_TABLE_NAME}
  `;
  let args = [];
  if(countryRegion) {
    query += ' WHERE countryRegion = ?'
    args.push(countryRegion);

    if(provinceState) {
      query += ' AND provinceState = ?'
      args.push(provinceState);
    }
  }
  query += ' GROUP BY date ORDER BY date ASC';
  const results = alasql(query, args);
  results.forEach((row) => {
    // Move 'date' property to 'name'
    row.name = row.date;
    delete row.date;
  });

  return results;
}

export default {
  // Constants
  CASES_TABLE_NAME,
  DATA_SERIES,
  REGION_TO_SUB_REGION_MAP,

  // Functions
  setup,
  querySeriesData,
}
