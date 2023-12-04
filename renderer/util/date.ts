//

import holidayJp from "@holiday-jp/holiday_jp";
import {Dayjs} from "dayjs";


export function isHoliday(date: Dayjs): boolean {
  return date.day() === 0 || date.day() === 6 || holidayJp.isHoliday(date.toDate());
}

export function isBusinessDay(date: Dayjs): boolean {
  return !isHoliday(date);
}

export function getBusinessDays(startDate: Dayjs, count: number): Array<Dayjs> {
  const businessDays = [];
  let currentDate = startDate;
  while (businessDays.length < count) {
    if (isBusinessDay(currentDate)) {
      businessDays.push(currentDate.clone());
    }
    currentDate = currentDate.add(1, "day");
  }
  return businessDays;
}