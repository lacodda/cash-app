import { format } from 'date-fns/fp';
import * as R from 'ramda';

export default {
  formatISO: (date: Date | string): string => {
    if (R.is(String, date)) {
      date = new Date(date);
    }
    return format("yyyy-MM-dd'T'HH:mm:ss'Z'", date);
  },
};
