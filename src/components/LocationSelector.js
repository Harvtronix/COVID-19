import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectItem } from 'carbon-components-react'

function LocationSelector({
  selectedProvinceState,
  selectedCountryRegion,
  countryRegionsToProvinceStates,
  onCountryRegionChange,
  onProvinceStateChange
}) {

  const countryRegionOptions = Object.keys(countryRegionsToProvinceStates).sort();
  const proviceStateOptions = selectedCountryRegion == null
    ? []
    : countryRegionsToProvinceStates[selectedCountryRegion].sort();

  return (
    <div style={{marginBottom: '1em'}}>
        <Select
          id="region-select"
          labelText="Select a region"
          onChange={onCountryRegionChange}
          value={selectedCountryRegion || ''}
        >
          <SelectItem text="- All Regions -" value="" />
          {
            countryRegionOptions.map((countryRegion) => (
              <SelectItem key={countryRegion} text={countryRegion} value={countryRegion} />
            ))
          }
        </Select>

        <div style={{height: '1em'}}></div>

        <Select
          id="sub-region-select"
          labelText="Select a sub-region"
          onChange={onProvinceStateChange}
          value={selectedProvinceState || ''}
        >
          <SelectItem text="- All Sub-regions -" value="" />
          {
            proviceStateOptions.length > 1 && proviceStateOptions.map((provinceState) => (
              <SelectItem key={provinceState} text={provinceState} value={provinceState} />
            ))
          }
        </Select>
    </div>
  );
}

export default LocationSelector;

LocationSelector.defaultProps = {
  selectedProvinceState: null,
  selectedCountryRegion: null,
};

LocationSelector.propTypes = {
  onCountryRegionChange: PropTypes.func,
  onProvinceStateChange: PropTypes.func,
  selectedProvinceState: PropTypes.string,
  selectedCountryRegion: PropTypes.string,
  countryRegionsToProvinceStates: PropTypes.objectOf(PropTypes.any).isRequired,
};
