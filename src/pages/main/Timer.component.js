import React, { useEffect, useState } from 'react';

import {
  StyledTimerLabel,
  StyledHorizontalView,
  StyledTimerText,
  StyledView,
  StyledTimerColons,
} from './timer.styled';
import dayjs from 'dayjs';

function Timer({ lastIn, currentPunchMode }) {
  const [totalTimeInHours, setTotalTimeInHours] = useState(0);

  useEffect(() => {
    let intervalId = null;

    if (currentPunchMode === 'stop') {
      intervalId = setInterval(() => {
        const currentDate = dayjs();
        const updatedTimeInHours = currentDate.diff(dayjs(lastIn), 'h', true);
        setTotalTimeInHours(updatedTimeInHours);
      }, 1000);
    } else {
      setTotalTimeInHours(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentPunchMode, lastIn]);

  // const totalTimeInHours =
  //   currentPunchMode === 'start' ? currentDate.diff(lastInDate, 'h', true) : 0;
  const flooredHours = Math.floor(totalTimeInHours);

  const totalCalculatedMinutes = (totalTimeInHours - flooredHours) * 60;
  const flooredMinutes = Math.floor(totalCalculatedMinutes);

  const totalCalculatedSeconds = (totalCalculatedMinutes - flooredMinutes) * 60;
  const flooredSeconds = Math.floor(totalCalculatedSeconds);
  return (
    <>
      <StyledHorizontalView>
        {/* Hour */}
        <StyledView>
          <StyledTimerText>{flooredHours} </StyledTimerText>
          <StyledTimerLabel>Hour</StyledTimerLabel>
        </StyledView>

        <StyledTimerColons>: </StyledTimerColons>

        {/* Minute */}
        <StyledView>
          <StyledTimerText>{flooredMinutes}</StyledTimerText>
          <StyledTimerLabel>Minute</StyledTimerLabel>
        </StyledView>

        <StyledTimerColons>: </StyledTimerColons>

        {/* Second */}
        <StyledView>
          <StyledTimerText>{flooredSeconds}</StyledTimerText>
          <StyledTimerLabel>Sec</StyledTimerLabel>
        </StyledView>
      </StyledHorizontalView>
    </>
  );
}
export default Timer;
