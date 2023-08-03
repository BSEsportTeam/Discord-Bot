import {DayJS} from '$core/utils/function/dayjs/dayjs';

export const getToday = (): Date => {
	return DayJS().tz('Europe/Paris').set('hour', 0).set('minute', 0).set('seconds', 0).utc().toDate();
};