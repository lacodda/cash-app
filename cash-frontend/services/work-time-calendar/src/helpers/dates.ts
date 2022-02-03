import { format } from 'date-fns/fp';

export default {
  formatISO: (date: Date) => format("yyyy-MM-dd'T'HH:mm:ss'Z'", date),
};
