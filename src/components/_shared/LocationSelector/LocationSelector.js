import React from 'react';
import PropTypes from 'prop-types';

import Data from '../../../modules/Data';

function LocationSelector({
  selectedRegion,
  selectedSubRegion,
  onRegionChange,
  onSubRegionChange
}) {

  const regionOptions = Object.keys(Data.REGION_TO_SUB_REGION_MAP);
  const subRegionOptions = selectedSubRegion == null
    ? []
    : Data.REGION_TO_SUB_REGION_MAP[selectedSubRegion]

  return (
    <div style={{marginBottom: '1em'}}>
        <select
          onChange={onRegionChange}
          value={selectedSubRegion || ''}
          style={{margin: '1rem'}}
        >
          <option key={''} value="">- All Regions -</option>
          {regionOptions.map((countryRegion) => <option key={countryRegion} value={countryRegion}>{countryRegion}</option> )}
        </select>

        <select onChange={onSubRegionChange} value={selectedRegion || ''} style={{margin: '1rem'}}>
          <option key={''} value="">- All Subregions -</option>
          {subRegionOptions.length > 1 && subRegionOptions.map((provinceState) => <option key={provinceState} value={provinceState}>{provinceState}</option> )}
        </select>
    </div>
  );
}

export default LocationSelector;

LocationSelector.defaultProps = {
  selectedRegion: null,
  selectedSubRegion: null,
};

LocationSelector.propTypes = {
  onRegionChange: PropTypes.func.isRequired,
  onSubRegionChange: PropTypes.func.isRequired,
  selectedRegion: PropTypes.string,
  selectedSubRegion: PropTypes.string,
};
