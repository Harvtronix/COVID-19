import React from "react";

import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

const BasicLineChart = ({queryResult}) => {

  let datasets = Object.keys(queryResult).map((setKey) => {
    let set = queryResult[setKey]

    for (let entry of set) {
      entry.value = entry.cases
    }

    return {
      label: setKey,
      data: set
    }
  })

  let data = {
    labels: [
      "Qty",
      "More",
      "Sold",
      "Restocking",
      "Misc"
    ],
    datasets
  }

  let options = {
    "title": "Line (time series)",
    "axes": {
      "left": {
        "secondary": true
      },
      "bottom": {
        "scaleType": "time",
        "primary": true
      }
    },
    "curve": "curveMonotoneX",
    "height": "5in",
    tooltip: {
      customHTML: function (arg) {
        if ('date' in arg && 'value' in arg) {
          return `
          <div class="datapoint-tooltip">
            <a style="background-color:#000" class="tooltip-color"></a>
            <p class="label">${arg.date}</p>
            <p class="value">${arg.value}</p>
          </div>
          `
        } else {
          return null
        }
      }
    }
  }

  return (
    <LineChart data={data} options={options} />
    )
  }

  export default BasicLineChart
