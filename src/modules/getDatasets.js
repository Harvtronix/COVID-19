import axios from 'axios';
import csvParse from 'csv-parse';

const PROVINCE_STATE_COLUMN = 0;
const COUNTRY_REGION_COLUMN = 1;
const LATITUDE_COLUMN = 2;
const LONGITUDE_COLUMN = 3;
const FIRST_DATE_COLUMN = 4;

/**
 * Parses CSV data and returns a 2D array
 * @param {string} data - CSV data in string form.
 * @returns {string[][]} A 2D array version of the input CSV data.
 */
const parseCsvData = (data) => {
  const csvParser = csvParse();
  const csvArr = [];

  // Use the readable stream api
  csvParser.on('readable', function(){
    let record;
    while ((record = csvParser.read())) {
      csvArr.push(record)
    }
  });
  // Catch any error
  csvParser.on('error', function(err){
    console.error(err.message)
  });
  // Send data to read to the stream
  csvParser.write(data);

  // Return the CSV as a 2D array
  return csvArr;
};

/**
 * Parses a 2D array of CSV data and returns a dataset in our expected form.
 * Sample:
 * {
 *   "US": {
 *     "New York": {
 *       "latitude" : "42.1657",
 *       "longitude" : "-74.9481",
 *       "dateData" : [
 *         {
 *           "date" : Date object (e.g. Wed Jan 22 2020 00:00:00 GMT-0500 (Eastern Standard Time))
 *           "cases" : "0"
 *         },
 *         {
 *           "date" : Date object (e.g. Wed Jan 23 2020 00:00:00 GMT-0500 (Eastern Standard Time))
 *           "cases" : "0"
 *         },
 *         ...
 *       ]
 *     }
 *     "California": {
 *       "latitude" : "36.1162",
 *       "longitude" : "-119.6816",
 *       "dateData" : [
 *         {
 *           "date" : Date object (e.g. Wed Jan 22 2020 00:00:00 GMT-0500 (Eastern Standard Time))
 *           "cases" : "0"
 *         },
 *         {
 *           "date" : Date object (e.g. Wed Jan 23 2020 00:00:00 GMT-0500 (Eastern Standard Time))
 *           "cases" : "0"
 *         },
 *         ...
 *       ]
 *     }
 *   }
 * }
 * @param {string} csvArr - A 2D array of CSV data.
 * @returns {Object} A structured nested dataset.
 */
const csvToNestedDataset = (csvArr) => {
  const dataset = {};

  let headerRow = null;

  csvArr.forEach((row, i) => {
    if(i === 0) {
      headerRow = row; // store header row
      return;
    }

    const countryRegion = row[COUNTRY_REGION_COLUMN];
    let provinceState = row[PROVINCE_STATE_COLUMN];

    if(!countryRegion) return; // right now, we want to skip anything with a missing country/region
    dataset[countryRegion] = dataset[countryRegion] || {};

    const countryRegionData = dataset[countryRegion];

    // When we encounter a countryRegion without a value for proviceState, use countryRegion as the
    // provinceState value
    if(!provinceState) { provinceState = countryRegion };

    countryRegionData[provinceState] = countryRegionData[provinceState] || {
      latitude: row[LATITUDE_COLUMN],
      longitude: row[LONGITUDE_COLUMN],
      dateData: []
    };

    const provinceStateDateData = countryRegionData[provinceState].dateData;

    row.forEach((cellValue, j) => {
      if(j < FIRST_DATE_COLUMN) return;

      const date = headerRow[j];
      provinceStateDateData.push({
        date: new Date(date).toISOString(),
        cases: parseInt(cellValue)
      });
    });
  });

  return dataset;
};


/**
 * Callback for retrieving dataset data.
 *
 * @callback datasetsCallback
 * @param {string[][]} confirmedDataset - Dataset describing confirmed cases of COVID-19.
 * @param {string[][]} deathsDataset - Dataset describing deaths from COVID-19.
 * @param {string[][]} recoveredDataset - Dataset describing recoveries from COVID-19.
 * @param {Object<string,string[]>} countryRegionsToProvinceStatesMap - Map of countryRegions to arrays of provinceStates.
 */

/**
 * Retrieves the primary datasets for the my-corona app.
 *
 * @param {datasetsCallback} callback - A callback to run.
 */
const getDatasets = (callback) => {
  const noCacheAxios = axios.create({
    headers: {'Cache-Control': 'no-cache'}
  });

  axios.all([
    noCacheAxios.get('./data/time_series_19-covid-Confirmed.csv'),
    noCacheAxios.get('./data/time_series_19-covid-Deaths.csv'),
    noCacheAxios.get('./data/time_series_19-covid-Recovered.csv')
  ]).then(axios.spread((confirmedResponse, deathsResponse, recoveredResponse) => {
    const confirmedDataset = csvToNestedDataset(parseCsvData(confirmedResponse.data));
    const deathsDataset = csvToNestedDataset(parseCsvData(deathsResponse.data));
    const recoveredDataset = csvToNestedDataset(parseCsvData(recoveredResponse.data));

    // provinceState to countryRegion mapping is derived from confirmed dataset, since it's the
    // superset of locations in deaths and recovered datasets.
    const countryRegionsToProvinceStatesMap = {};
    Object.entries(confirmedDataset).forEach((entry) => {
      countryRegionsToProvinceStatesMap[entry[0]] = Object.keys(entry[1]).sort(); // want to sort provinceStates list
    });
    countryRegionsToProvinceStatesMap.sort(); // want to sort countryRegions

    callback(
      confirmedDataset,
      deathsDataset,
      recoveredDataset,
      countryRegionsToProvinceStatesMap
    );
  })).catch(function (error) {
    console.log(error);
  });
};

export default getDatasets;
