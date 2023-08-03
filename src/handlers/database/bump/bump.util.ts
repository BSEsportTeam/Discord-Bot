import {DayJS} from '$core/utils/function/dayjs/dayjs';

export const getToday = (): Date => {
	console.log(DayJS());
	console.log(DayJS.tz());
	console.log(DayJS().tz('Europe/Paris'));
	console.log(DayJS().tz('Europe/Paris').set('hour', 0));
	console.log(DayJS().tz('Europe/Paris').set('hour', 0).set('minute', 0));
	console.log(DayJS().tz('Europe/Paris').set('hour', 0).set('minute', 0).set('seconds', 0));
	console.log(DayJS().tz('Europe/Paris').set('hour', 0).set('minute', 0).set('seconds', 0).utc().toDate());
	return DayJS().tz('Europe/Paris').set('hour', 0).set('minute', 0).set('seconds', 0).utc().toDate();
};