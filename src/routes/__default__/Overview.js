import React, { useState, useContext, useEffect, useMemo } from 'react';

import css from './Overview.module.css';

import TitleContext from '../../components/TitleContext';
import Left from './left/Left';
import Right from './right/Right';
import Data from '../../modules/Data';

const Overview = () => {
  const [countryRegion, setCountryRegion] = useState(null);
  const [provinceState, setProvinceState] = useState(null);
  const {setTitle} = useContext(TitleContext);

  // Queries are expensive, so memoize them. This will also prevent unnecessary re-renders of the
  // line chart.
  const [
    chartData,
    totalConfirmed,
    lastThreeDaysConfirmed
  ] = useMemo(() => {
    return [
      Data.getSeriesData(countryRegion, provinceState),
      Data.getTotalConfirmed(countryRegion, provinceState),
      Data.getLastThreeDaysConfirmed(countryRegion, provinceState)
    ]
  }, [countryRegion, provinceState])

  /**
   * Update title when region or sub-region changes
   */
  useEffect(() => {
    let chartTitle = 'COVID-19 Cases: ';
    if(provinceState || countryRegion) {
      chartTitle += (provinceState ? ` ${provinceState},` : '')
        + (countryRegion ? ` ${countryRegion}` : '');
    } else {
      chartTitle += 'Global';
    }

    setTitle(chartTitle);
  }, [countryRegion, provinceState, setTitle]);

  return (
    <div className={css.Container}>
      <Left
        chartData={chartData}
        countryRegion={countryRegion}
        provinceState={provinceState}
        setCountryRegion={setCountryRegion}
        setProvinceState={setProvinceState}
      />
      <Right
        totalConfirmed={totalConfirmed}
        lastThreeDaysConfirmed={lastThreeDaysConfirmed}
      />
    </div>
  )
}

export default Overview
