import React from 'react';
import numeral from 'numeral';

import css from '../../Overview.module.css';

import StatCard from './StatCard/StatCard';
import DataAnalysis from '../../../../modules/DataAnalysis';

const formatDayToDayValue = (seriesData) => {
  const lastTwoSlopes = DataAnalysis.calculateSlopes(
    seriesData.map((ele) => (ele.confirmed)),
    2
  );

  let today = lastTwoSlopes[1]
  let yesterday = lastTwoSlopes[0]

  let incDecArrow = today > yesterday ? '↑' : '↓';
  let percent = (100 * ((today - yesterday) / yesterday)).toFixed(1);

  let spanClass = percent <= 0 ? css.good : css.bad;
  let plusMinus = percent >= 0 ? '+' : ''

  return (
    <>
      <div>
        {`${yesterday} → ${today}`}
      </div>
      <div>
        (<span className={spanClass}>{`${plusMinus}${percent}%`}</span>)
        <span className={spanClass}>{incDecArrow}</span>
      </div>
    </>
  )
}

const formatDaysUntilTotalInfection = (seriesData) => {
  const MAX_PROJECTION_DAYS = 1000;

  // later... save time when vaccine might be available and use that as the final day
  const projectionData = DataAnalysis.calculateConfirmedProjection(
    seriesData.map((ele) => (ele.confirmed)),
    {maxProjectionDays:  MAX_PROJECTION_DAYS}
  )

  if (projectionData.length >= MAX_PROJECTION_DAYS) {
    return 'Never';
  } else {
    return numeral(projectionData.length).format('0,0');
  }
}

const StatsContainer = ({seriesData}) => {
  const allStats = [
    {
      header: 'Confirmed (total)',
      value: numeral(DataAnalysis.getTotals(seriesData)['confirmed']).format('0,0')
    },
    {
      header: 'Confirmed (day/day)',
      value: formatDayToDayValue(seriesData)
    },
    {
      header: 'Days Until 100% Infection',
      value: formatDaysUntilTotalInfection(seriesData)
    },
  ];

  return (
    <div className={css.StatsContainer}>
      {
        allStats.map((stat, index) => (
          <StatCard.Container key={index}>
            <StatCard.Header>
              {stat.header}
            </StatCard.Header>
            <StatCard.Content>
              {stat.value}
            </StatCard.Content>
          </StatCard.Container>
        ))
      }
    </div>
  )
}

export default StatsContainer;
