import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  StyledMainView,
  StyledHorizontalLine,
  StyledHorizontalView,
} from '../../components/global.styled';
import {
  StyledDateRange,
  StyledDate,
  StyledScheduleTile,
  StyledScheduleDate,
  StyledScheduleRow,
} from './profile.styled';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import axios from 'axios';
import { showToast } from '../../helpers/useToast';
import PrimaryLoader from '../../components/PrimaryLoader';
var utc = require('dayjs/plugin/utc');
var isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(utc);
dayjs.extend(isoWeek);
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ScheduleTable = ({ navigation }) => {
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().utc().startOf('week'),
    endDate: dayjs().utc().endOf('week'),
  });

  const query = useQuery(
    ['roster', dateRange.startDate.toDate()],
    () => {
      return axios.get(process.env.BASE_URL + '/roster/single', {
        params: { date: dateRange.startDate.utc().format('YYYY-MM-DD') },
        headers: { Authorization: `Bearer ${navigation.data?.token}` },
      });
    },
    {
      onSuccess: data => {},
      onError: e => {
        showToast(e.response?.data.data || e.message);
      },
    },
  );
  return (
    <>
      <StyledMainView>
        <StyledHorizontalView>
          <FontAwesome5
            name="angle-left"
            color={theme.textColor}
            size={16}
            onPress={() => {
              setDateRange({
                startDate: dayjs(dateRange.startDate).utc().local().subtract(1, 'week'),
                endDate: dayjs(dateRange.endDate).utc().local().subtract(1, 'week'),
              });
            }}
          />
          <StyledDateRange>
            {dayjs(dateRange.startDate).format('ddd, MMM DD') +
              ' - ' +
              dayjs(dateRange.endDate).format('ddd, MMM DD')}
          </StyledDateRange>
          <FontAwesome5
            name="angle-right"
            color={theme.textColor}
            size={16}
            onPress={() => {
              setDateRange({
                startDate: dayjs(dateRange.startDate).utc().local().add(1, 'week'),
                endDate: dayjs(dateRange.endDate).utc().local().add(1, 'week'),
              });
            }}
          />
        </StyledHorizontalView>
      </StyledMainView>
      <StyledHorizontalLine />
      <>
        {query.isLoading ? (
          <PrimaryLoader />
        ) : query.isError ? (
          <>
            <Text>{query.data}</Text>
          </>
        ) : (
          days.map((day, index) => {
            return (
              <StyledScheduleRow key={`generated-row-${index}`}>
                <StyledScheduleDate>
                  <StyledDate>
                    {dayjs(dateRange.startDate).add(index, 'day').format('ddd, DD')}
                  </StyledDate>
                </StyledScheduleDate>
                <StyledScheduleTile
                  style={{
                    backgroundColor: query.data.data.hasOwnProperty([day])
                      ? query.data.data[day].color
                      : theme.backgroundColor,
                  }}>
                  <StyledDate style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                    {query.data.data.hasOwnProperty([day]) ? query.data.data[day].title : ''}
                  </StyledDate>
                  <StyledDate style={{ fontSize: 13 }}>
                    {query.data.data.hasOwnProperty([day])
                      ? dayjs(query.data.data[day].in).utc().local().format('HH:mm') +
                        ' - ' +
                        dayjs(query.data.data[day].out).utc().local().format('HH:mm')
                      : ''}
                  </StyledDate>
                  {/* <StyledDate> */}
                  {/* {query.data.data.hasOwnProperty([day])
                      ? 'IN: ' + query.data.data[day].in + '    '
                      : ''}
                    {query.data.data.hasOwnProperty([day])
                      ? 'OUT: ' + query.data.data[day].out
                      : ''} */}
                  {/* </StyledDate> */}
                </StyledScheduleTile>
              </StyledScheduleRow>
            );
          })
        )}
      </>
    </>
  );
};
export default ScheduleTable;
