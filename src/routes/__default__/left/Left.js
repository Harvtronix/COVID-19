import React from 'react';

import css from '../Overview.module.css';

import BasicLineChart from '../charts/line/BasicLineChart';
import LocationSelector from '../../../components/location-selector/LocationSelector';

const Left = ({
  provinceState,
  countryRegion,
  setCountryRegion,
  setProvinceState,
  chartData
}) => {
  return (
    <div className={css.Left}>
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
        <BasicLineChart chartData={chartData} />
      </div>
    </div>
  )
}

export default Left;
