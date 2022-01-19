interface IDay {
  date: Date;
  formatted: string;
  dayOfWeek: number;
  isWeekend: boolean;
  isToday: boolean;
  isSelectedMonth: boolean;
}

interface IMonth {
  [index: number]: IDay;
}

interface IDayData {
  date: string;
  time: number | Date;
  _id?: string;
}

interface IFetchParams {
  from: Date;
  to: Date;
}
