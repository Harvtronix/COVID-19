import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import css from './BasicLineChart.module.css'

import Colors from '../../../../modules/Colors';

const CustomizedXAxisTick = ({x, y, payload}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        className={css.TickTextX}
        fill={Colors.primary}
      >
        {payload.value}
      </text>
    </g>
  );
}

const CustomizedYAxisTick = ({x, y, payload}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        className={css.TickTextY}
        fill={Colors.primary}
      >
        {payload.value}
      </text>
    </g>
  );
}

const BasicLineChart = ({chartData, caseTypeConfig}) => {
  return (
    <div style={{height: '500px'}}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 0, right: 16, left: 16, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke={Colors.primary}
            tick={CustomizedXAxisTick}
            height={90}
          />
          <YAxis
            stroke={Colors.primary}
            tick={CustomizedYAxisTick}
          />
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
    </div>
  );
};

export default BasicLineChart;
