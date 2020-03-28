import React, { useEffect, useState } from 'react';
import alasql from 'alasql';


import BasicLineChart from './charts/line/BasicLineChart';
import LocationSelector from '../../components/LocationSelector';
import Colors from '../../modules/Colors';
import tableData from '../../data/tableData.json';
import sortedCountryRegionsToProvinceStates from '../../data/sortedCountryRegionsToProvinceStates.json';

const Home = () => {
  const casesTableName = 'cases';
  const caseTypeConfig = {
    confirmed: {
      color: Colors.lineConfirmed
    },
    deaths: {
      color: Colors.lineDeaths
    },
    recovered: {
      color: Colors.lineRecovered
    }
  };

  const [countryRegion, setCountryRegion] = useState(null);
  const [provinceState, setProvinceState] = useState(null);
  const [sqlTablesLoaded, setSqlTablesLoaded] = useState(false);

  // Load datasets
  useEffect(() => {
    const createTableQuery = `
      CREATE TABLE ${casesTableName} (
        provinceState STRING,
        countryRegion STRING,
        date DATE,
        ${Object.keys(caseTypeConfig).map((type) => `${type} INT`).join(', ')}
      )
    `;
    alasql(createTableQuery);
    alasql.tables.cases.data = tableData;
    setSqlTablesLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!sqlTablesLoaded) {
    return 'Loading...';
  }

  const generateChartData = () => {
    let query = `
      SELECT date,
      ${Object.keys(caseTypeConfig).map((type) => `sum(${type}) as ${type}`).join(', ')}
      FROM ${casesTableName}
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
  };

  const chartData = generateChartData();

  let chartTitle = 'COVID-19 Cases: ';
  if(provinceState || countryRegion) {
    chartTitle += (provinceState ? ` ${provinceState},` : '')
      + (countryRegion ? ` ${countryRegion}` : '');
  } else {
    chartTitle += 'Global';
  }

  return (
    <>
      <LocationSelector
        selectedProvinceState={provinceState}
        selectedCountryRegion={countryRegion}
        countryRegionsToProvinceStates={sortedCountryRegionsToProvinceStates}
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
          <BasicLineChart chartTitle={chartTitle} chartData={chartData} caseTypeConfig={caseTypeConfig} />
        }
      </div>
    </>
  )
}

export default Home;
