// import moment from 'moment';
import * as moment from 'moment';
export const getDurationInMinutes = (lockedAt: Date): number => {
  const ms = moment(
    moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'),
    'DD/MM/YYYY HH:mm:ss',
  ).diff(
    moment(
      moment(lockedAt).format('DD/MM/YYYY HH:mm:ss'),
      'DD/MM/YYYY HH:mm:ss',
    ),
  );
  const duration = moment.duration(ms);
  const minutes = duration.asMinutes();

  return minutes ? minutes : 0;
};
