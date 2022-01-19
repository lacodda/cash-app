import { format } from 'date-fns/fp';

export class Dates {
  static formatISO: Function = format("yyyy-MM-dd'T'HH:mm:ss'Z'");
}
