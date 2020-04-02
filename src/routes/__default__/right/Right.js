import React from 'react';

import css from '../Overview.module.css';

import StatCard from './StatCard/StatCard';

const calculateDayToDayValue = (lastThreeDaysData) => {
  // TODO: for real stuff!

  let today = lastThreeDaysData[0] - lastThreeDaysData[1];
  let yesterday = lastThreeDaysData[1] - lastThreeDaysData[2];

  let incDecArrow = today > yesterday ? '↑' : '↓';
  let percent = (100 * ((today - yesterday) / yesterday)).toFixed(1);

  return `${yesterday} → ${today} (${percent}%) ${incDecArrow}`
}

const calculateThreeDayAverage = (lastThreeDaysData) => {
  // TODO: for real stuff!

  return '2.558 ↓'
}

const calculateDaysUntilTotalInfection = (totalConfirmed, lastThreeDaysData) => {
  let today = lastThreeDaysData[0] - lastThreeDaysData[1];
  let yesterday = lastThreeDaysData[1] - lastThreeDaysData[2];

  let rateDelta = today - yesterday;

  if (today === 0 && yesterday === 0) {
    return 'Never';
  }

  if (rateDelta < 0) {
    rateDelta = today;
  }

  let infected = totalConfirmed;
  const targetNumber = 7530000000; // 7.53 billion
  let days = 0;
  let currentRate = today + rateDelta;

  while (infected < targetNumber) {
    infected += currentRate;
    currentRate += rateDelta;
    days++;
  }

  return days;
}

const Right = ({
  totalConfirmed,
  lastThreeDaysConfirmed
}) => {
  return (
    <div className={css.Right}>
      <StatCard.Container>
        <StatCard.Header>
          Confirmed (total)
        </StatCard.Header>
        <StatCard.Content>
          {totalConfirmed}
        </StatCard.Content>
      </StatCard.Container>

      <StatCard.Container>
        <StatCard.Header>
          Confirmed (day/day)
        </StatCard.Header>
        <StatCard.Content>
          {calculateDayToDayValue(lastThreeDaysConfirmed)}
        </StatCard.Content>
      </StatCard.Container>

      <StatCard.Container>
        <StatCard.Header>
          Rate of change (3-day avg)
        </StatCard.Header>
        <StatCard.Content>
          {calculateThreeDayAverage(lastThreeDaysConfirmed)}
        </StatCard.Content>
      </StatCard.Container>

      <StatCard.Container>
        <StatCard.Header>
          Days Until 100% Infection
        </StatCard.Header>
        <StatCard.Content>
          {calculateDaysUntilTotalInfection(totalConfirmed, lastThreeDaysConfirmed)}
        </StatCard.Content>
      </StatCard.Container>
    </div>
  )
}

export default Right;
