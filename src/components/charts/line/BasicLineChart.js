import React from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import Colors from '../../../modules/Colors';

const BasicLineChart = ({chartData, chartTitle}) => {

  const datesToChartData = {};

  Object.entries(chartData).forEach(([key, val]) => {
    const label = key;
    const data = val.data;

    data.forEach((dataPoint) => {
      const dateString = moment(dataPoint.date.toISOString()).format('YYYY-MM-DD');
      datesToChartData[dateString] = datesToChartData[dateString] || {
        name: dateString
      };
      const dataForDate = datesToChartData[dateString];
      dataForDate[label] = dataPoint.cases;
    });
  });

  const data = _.sortBy(Object.values(datesToChartData), ['name']);
  return (
    <>
      <h1 style={{fontSize: '2em', marginBottom: '.5em'}}>{chartTitle}</h1>
      <ResponsiveContainer height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke={Colors.primary} />
          <YAxis stroke={Colors.primary} />
          <Tooltip />
          <Legend stroke={Colors.primary} />
          {
            Object.entries(chartData).map(([key, value]) => (
              <Line
                type="monotone"
                dataKey={key}
                stroke={value.color}
                dot={{
                  fill: value.color
                }}
                key={key}
              />
            ))
          }
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default BasicLineChart;
