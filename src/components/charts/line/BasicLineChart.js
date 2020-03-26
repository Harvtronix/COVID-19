import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Colors from '../../../modules/Colors';

const BasicLineChart = ({chartData, chartTitle, caseTypeConfig}) => {
  return (
    <>
    <h1 style={{fontSize: '2em', marginBottom: '.5em'}}>{chartTitle}</h1>
    <ResponsiveContainer height={400}>
      <LineChart
          data={chartData}
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
            Object.entries(caseTypeConfig).map(([key, value]) => (
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
