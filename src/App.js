import React, { useEffect, useState } from 'react';
import alasql from 'alasql';

import './App.css';
import getDatasets from './modules/getDatasets';
import BasicLineChart from './components/charts/line/BasicLineChart';
import LocationSelector from './components/LocationSelector';
import Colors from './modules/Colors';

function App() {
  const dataTableNames = ['confirmed', 'deaths', 'recovered'];

  const [countryRegion, setCountryRegion] = useState(null);
  const [provinceState, setProvinceState] = useState(null);
  const [countryRegionsToProvinceStates, setCountryRegionsToProvinceStates] = useState({});
  const [sqlTablesLoaded, setSqlTablesLoaded] = useState(false);

  // Load datasets
  useEffect(() => {
    getDatasets((confirmedDataset, deathsDataset, recoveredDataset, countryRegionsToProvinceStatesMap) => {
      const datasetToTableData = (dataset) => {
        const tableData = [];
        Object.entries(dataset).forEach((countryRegionDataEntry) => {
          const countryRegion = countryRegionDataEntry[0];
          const provinceStateData = countryRegionDataEntry[1];
          Object.entries(provinceStateData).forEach((provinceStateDataEntry) => {
            const provinceState = provinceStateDataEntry[0];
            const provinceStateData = provinceStateDataEntry[1];
            provinceStateData.dateData.forEach((dateDataItem) => {
              tableData.push({ countryRegion, provinceState: provinceState, date: new Date(dateDataItem.date), cases: dateDataItem.cases });
            });
          });
        });
        return tableData;
      };

      const columnStatement = '(provinceState STRING, countryRegion STRING, date DATE, cases INT)'; // using 'cases' here instead of 'count' to avoid SQL conflicts
      dataTableNames.forEach((tableName) => {
        alasql(`CREATE TABLE ${tableName} ${columnStatement}`);
      });

      alasql.tables.confirmed.data = datasetToTableData(confirmedDataset);
      alasql.tables.deaths.data = datasetToTableData(deathsDataset);
      alasql.tables.recovered.data = datasetToTableData(recoveredDataset);

      setCountryRegionsToProvinceStates(countryRegionsToProvinceStatesMap);
      setSqlTablesLoaded(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!sqlTablesLoaded) {
    return 'Loading...';
  }

  const queryDateCounts = () => {
    const [confirmedQueryResult, deathsQueryResult, recoveredQueryResult] = dataTableNames.map((tableName) => {
      let query = `SELECT date, sum(cases) as cases FROM ${tableName}`;
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
      return alasql(query, args);
    });

    return {
      confirmedQueryResult,
      deathsQueryResult,
      recoveredQueryResult
    }
  };

  const {confirmedQueryResult, deathsQueryResult, recoveredQueryResult} = queryDateCounts();
  const chartData = {
    Confirmed: {
      data: confirmedQueryResult,
      color: Colors.lineConfirmed
    },
    Deaths: {
      data: deathsQueryResult,
      color: Colors.lineDeaths
    },
    Recovered: {
      data: recoveredQueryResult,
      color: Colors.lineRecovered
    }
  }
  let chartTitle = 'COVID-19 Cases: ';
  if(provinceState || countryRegion) {
    chartTitle += (provinceState ? ` ${provinceState},` : '')
      + (countryRegion ? ` ${countryRegion}` : '');
  } else {
    chartTitle += 'Global';
  }


  return (
    <div className="App">
      <LocationSelector
        selectedProvinceState={provinceState}
        selectedCountryRegion={countryRegion}
        countryRegionsToProvinceStates={countryRegionsToProvinceStates}
        onCountryRegionChange={(e) => {
          setCountryRegion(e.target.value === '' ? null : e.target.value);
          setProvinceState(null); // reset provinceState selection whenever a new countryRegion is selected
        }}
        onProvinceStateChange={(e) => {
          setProvinceState(e.target.value === '' ? null : e.target.value);
        }}
      />
      <div className="LineChartContainer">
        {
          <BasicLineChart chartTitle={chartTitle} chartData={chartData} />
        }
      </div>
    </div>
  );
}

export default App;
