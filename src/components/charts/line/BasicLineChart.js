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
    // "datasets": [
    //     {
    //         "label": "Dataset 1",
    //         "data": [
    //             {
    //                 "date": "2019-01-01T05:00:00.000Z",
    //                 "value": 10000
    //             },
    //             {
    //                 "date": "2019-01-05T05:00:00.000Z",
    //                 "value": 65000
    //             },
    //             {
    //                 "date": "2019-01-08T05:00:00.000Z",
    //                 "value": null
    //             },
    //             {
    //                 "date": "2019-01-13T05:00:00.000Z",
    //                 "value": 49213
    //             },
    //             {
    //                 "date": "2019-01-17T05:00:00.000Z",
    //                 "value": 51213
    //             }
    //         ]
    //     },
    //     {
    //         "label": "Dataset 2",
    //         "data": [
    //             {
    //                 "date": "2019-01-02T05:00:00.000Z",
    //                 "value": 0
    //             },
    //             {
    //                 "date": "2019-01-06T05:00:00.000Z",
    //                 "value": 57312
    //             },
    //             {
    //                 "date": "2019-01-08T05:00:00.000Z",
    //                 "value": 21432
    //             },
    //             {
    //                 "date": "2019-01-15T05:00:00.000Z",
    //                 "value": 70323
    //             },
    //             {
    //                 "date": "2019-01-19T05:00:00.000Z",
    //                 "value": 21300
    //             }
    //         ]
    //     }
    // ]
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
    "height": "400px"
  }

  return (
    <LineChart data={data} options={options} />
    )
  }

  export default BasicLineChart
