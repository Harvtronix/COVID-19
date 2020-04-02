import React from 'react';
import PropTypes from 'prop-types'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import css from './BasicLineChart.module.css'

import Colors from '../../../../modules/Colors';
import Data from '../../../../modules/Data';

const lineDefs = {
  [Data.DATA_SERIES.CONFIRMED]: {
    color: Colors.lineConfirmed
  },
  [Data.DATA_SERIES.DEATHS]: {
    color: Colors.lineDeaths
  },
  [Data.DATA_SERIES.RECOVERED]: {
    color: Colors.lineRecovered
  }
};

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

const BasicLineChart = ({seriesData}) => {
  return (
    <div style={{height: '500px'}}>
      <ResponsiveContainer>
        <LineChart
          data={seriesData}
          margin={{
            top: 0, right: 4, left: 8, bottom: 0,
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
            Object.entries(lineDefs).map(([key, value]) => (
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

BasicLineChart.propTypes = {
  seriesData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BasicLineChart;
