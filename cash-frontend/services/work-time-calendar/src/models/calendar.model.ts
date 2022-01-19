export interface IDay {
  date: Date;
  formatted: string;
  dayOfWeek: number;
  isWeekend: boolean;
  isToday: boolean;
  isSelectedMonth: boolean;
}

export interface IMonth {
  [index: number]: IDay;
}

export interface IDayData {
  date: string;
  time: number | Date;
  _id?: string;
}

export interface IFetchParams {
  from: Date;
  to: Date;
}
