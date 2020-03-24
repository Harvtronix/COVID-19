import React from "react";
import * as moment from 'moment';
import * as numeral from 'numeral';

import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

const BasicLineChart = ({chartData, chartTitle}) => {

  let datasets = Object.keys(chartData).map((setKey) => {
    let set = chartData[setKey]

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
      "Sold"
    ],
    datasets
  }

  let options = {
    "title": chartTitle,
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
          <div>
            <div class="datapoint-tooltip">
              <a style="background-color:#000" class="tooltip-color"></a>
              <p class="label"><strong>${arg.datasetLabel}:</strong> ${numeral(arg.value).format('0,0')}</p>
            </div>
            <div class="datapoint-tooltip">
              <a style="background-color:#000" class="tooltip-color"></a>
              <p class="label"><strong>Date:</strong> ${moment(arg.date.toISOString()).format('YYYY-MM-DD')}</p>
            </div>
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
