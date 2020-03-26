import React from 'react';
import PropTypes from 'prop-types';

function LocationSelector(props) {
  const {selectedProvinceState, selectedCountryRegion, countryRegionsToProvinceStates, onCountryRegionChange, onProvinceStateChange} = props;

  const countryRegionOptions = Object.keys(countryRegionsToProvinceStates).sort();
  const proviceStateOptions = selectedCountryRegion == null
    ? []
    : countryRegionsToProvinceStates[selectedCountryRegion].sort();

  return (
    <div style={{marginBottom: '1em'}}>
        <select
          onChange={onCountryRegionChange}
          value={selectedCountryRegion || ''}
          style={{margin: '1rem'}}
        >
          <option key={''} value="">- All Regions -</option>
          {countryRegionOptions.map((countryRegion) => <option key={countryRegion} value={countryRegion}>{countryRegion}</option> )}
        </select>

        <select onChange={onProvinceStateChange} value={selectedProvinceState || ''} style={{margin: '1rem'}}>
          <option key={''} value="">- All Subregions -</option>
          {proviceStateOptions.length > 1 && proviceStateOptions.map((provinceState) => <option key={provinceState} value={provinceState}>{provinceState}</option> )}
        </select>
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
