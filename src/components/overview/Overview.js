import React, { useState, useContext, useEffect, useMemo } from 'react';

import css from './Overview.module.css';

import TitleContext from '../../components/_shared/TitleContext';
import ChartContainer from './Overview/ChartContainer/ChartContainer'
import StatsContainer from './Overview/StatsContainer/StatsContainer';
import Data from '../../modules/Data';

const Overview = () => {
  const [countryRegion, setCountryRegion] = useState(null);
  const [provinceState, setProvinceState] = useState(null);
  const {setTitle} = useContext(TitleContext);

  // Queries are expensive, so memoize them. This will also prevent unnecessary re-renders of the
  // line chart.
  const seriesData = useMemo(() => {
    return Data.querySeriesData(countryRegion, provinceState);
  }, [countryRegion, provinceState]);

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
      <ChartContainer
        seriesData={seriesData}
        countryRegion={countryRegion}
        provinceState={provinceState}
        setCountryRegion={setCountryRegion}
        setProvinceState={setProvinceState}
      />
      <StatsContainer
        seriesData={seriesData}
      />
    </div>
  )
}

export default Overview
