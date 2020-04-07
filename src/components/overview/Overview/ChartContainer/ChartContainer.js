import React from 'react';

import css from '../../Overview.module.css';

import BasicLineChart from './BasicLineChart/BasicLineChart';
import LocationSelector from '../../../_shared/LocationSelector/LocationSelector';

const ChartContainer = ({
  provinceState,
  countryRegion,
  setCountryRegion,
  setProvinceState,
  seriesData
}) => {
  return (
    <div className={css.ChartContainer}>
      <LocationSelector
        selectedRegion={provinceState}
        selectedSubRegion={countryRegion}
        onRegionChange={(e) => {
          setCountryRegion(e.target.value === '' ? null : e.target.value);
          setProvinceState(null); // reset provinceState selection whenever a new countryRegion is selected
        }}
        onSubRegionChange={(e) => {
          setProvinceState(e.target.value === '' ? null : e.target.value);
        }}
      />
      <div className="LineChartContainer">
        <BasicLineChart seriesData={seriesData} />
      </div>
    </div>
  )
}

export default ChartContainer;
