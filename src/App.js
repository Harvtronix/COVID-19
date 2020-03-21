import React, { useEffect, useState } from 'react';
import alasql from 'alasql';

import './App.css';
import getDatasets from './getDatasets';
import alasql from 'alasql';
import BasicLineChart from './charts/line/BasicLineChart';
import LocationSelector from './components/LocationSelector';

function App() {
  const [countryRegion, setCountryRegion] = useState(null);
  const [provinceState, setProvinceState] = useState(null);
  const [countryRegionsToProvinceStates, setCountryRegionsToProvinceStates] = useState({});
  const [sqlTableLoaded, setSqlTableLoaded] = useState(false);

  const [confirmedDataset, setConfirmedDataset] = useState(null);
  const [deathsDataset, setDeathsDataset] = useState(null);
  const [recoveredDataset, setRecoveredDataset] = useState(null);

  // Load datasets
  useEffect(() => {
    getDatasets((confirmedDataset, deathsDataset, recoveredDataset, countryRegionsToProvinceStatesMap) => {
      setConfirmedDataset(confirmedDataset);
      setDeathsDataset(deathsDataset);
      setRecoveredDataset(recoveredDataset);
      setCountryRegionsToProvinceStates(countryRegionsToProvinceStatesMap);
    });
  }, []);

  // Run after every update of provinceState or countryRegion
  useEffect(() => {
    if(!confirmedDataset || !deathsDataset || !recoveredDataset || !countryRegionsToProvinceStates) {
      return;
    }

    const datasetToTableData = (dataset, countryRegionFilter, provinceStateFilter) => {
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

    alasql(`DROP TABLE IF EXISTS confirmed`);
    alasql(`DROP TABLE IF EXISTS deaths`);
    alasql(`DROP TABLE IF EXISTS recovered`);

    const columnStatement = '(provinceState STRING, countryRegion STRING, date DATE, cases INT)'; // using 'cases' here instead of 'count' to avoid SQL conflicts
    alasql(`CREATE TABLE confirmed ${columnStatement}`);
    alasql(`CREATE TABLE deaths ${columnStatement}`);
    alasql(`CREATE TABLE recovered ${columnStatement}`);

    alasql.tables.confirmed.data = datasetToTableData(confirmedDataset, countryRegion, provinceState);
    alasql.tables.deaths.data = datasetToTableData(deathsDataset, countryRegion, provinceState);
    alasql.tables.recovered.data = datasetToTableData(recoveredDataset, countryRegion, provinceState);

    setSqlTableLoaded(true);
  }, [provinceState, countryRegion, confirmedDataset, deathsDataset, recoveredDataset, countryRegionsToProvinceStates]);

  if(!confirmedDataset || !deathsDataset || !recoveredDataset) {
    return 'Loading...';
  }

  const renderDatasets = () => {
    if(!sqlTableLoaded) return;

    let query = 'SELECT * FROM confirmed';
    let args = [];
    if(countryRegion) {
      query += ' WHERE countryRegion = ?'
      args.push(countryRegion);

      if(provinceState) {
        query += ' AND provinceState = ?'
        args.push(provinceState);
      }
    }
    const queryResult = alasql(query, args);

    return (
      <>
        {
          sqlTableLoaded ? `Found ${queryResult.length} data points.` : 'Loading data...'
        }
      </>
    );
  };

  return (
    <div className="App">
      <LocationSelector
        selectedProvinceState={provinceState}
        selectedCountryRegion={countryRegion}
        countryRegionsToProvinceStates={countryRegionsToProvinceStates}
        onCountryRegionChange={(e) => {
          setCountryRegion(e.target.value);
          setProvinceState(null); // reset provinceState selection whenever a new countryRegion is selected
        }}
        onProvinceStateChange={(e) => {
          setProvinceState(e.target.value);
        }}
      />
      <p>
        { renderDatasets() }
      </p>
      <div className="LineChartContainer">
        <BasicLineChart />
      </div>
    </div>
  );
}

export default App;
