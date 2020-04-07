function calculateAverageSlope(values, numDays) {
  const numSlopes = numDays - 1;
  const slopes = calculateSlopes(values, numSlopes);

  const average = slopes.reduce((prev, cur) => (prev+cur)) / numSlopes

  return average;
}

function calculateSlopes(values, numSlopes) {
  // Ensure there are enough values
  if (values.length <= numSlopes) {
    throw new Error(`Not enough data points provided to calculate ${numSlopes} slopes`);
  }

  const results = []
  for (let i=0; i<numSlopes; i++) {
    const slope = values[values.length-i-1] - values[values.length-i-2];
    results.unshift(slope);
  }

  return results;
}

/**
 * @param {*} seriesData
 * @param {object} options
 * @param {number} [options.maxProjectionDays=14] - Max days to project. This will be equal to the
 * resulting array size. Default is 14.
 * @param {number} [options.maxProjectionVal=7530000000] - Max value to reach when performing
 * projections. Default is 7,530,000,000
 * @param {number} [options.numProjectionBasisDays=4] - Prior days to use when projecting future
 * values. Default is 4.
 */
function calculateConfirmedProjection(
    values,
    options={}
) {
  // param check
  if (!('maxProjectionDays' in options)) {
    options.maxProjectionDays = 14
  }
  if (!('maxProjectionVal' in options)) {
    options.maxProjectionVal = 7530000000
  }
  if (!('numProjectionBasisDays' in options)) {
    options.numProjectionBasisDays = 4
  }

  const projectionSet = [];

  const basisDays = Math.min(options.numProjectionBasisDays, values.length);

  const averageSlope = Math.round(calculateAverageSlope(values, basisDays));

  let lastVal = values[values.length-1];
  let nextAdd = averageSlope;
  for (let i=0; (i<options.maxProjectionDays) && (lastVal<options.maxProjectionVal); i++) {
    const projection = lastVal + nextAdd;
    projectionSet.push(projection)

    lastVal = projection;
    nextAdd += averageSlope;
  }

  console.log(projectionSet)
  return projectionSet;
}

function getTotals(seriesData) {
  return seriesData[seriesData.length - 1];
}

function getLastThreeDays(seriesData) {
  return seriesData.slice(seriesData.length - 3, seriesData.length);
}

export default {
  calculateAverageSlope,
  calculateSlopes,
  calculateConfirmedProjection,

  getTotals,
  getLastThreeDays
}
