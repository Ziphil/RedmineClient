//

import holidayJp from "@holiday-jp/holiday_jp";
import {Dayjs} from "dayjs";


export function isOffDate(date: Dayjs): boolean {
  return date.day() === 0 || date.day() === 6 || holidayJp.isHoliday(date.toDate());
}

export function isBusinessDate(date: Dayjs): boolean {
  return !isOffDate(date);
}

export function getBusinessDates(startDate: Dayjs, beforeCount: number, afterCount: number): Array<Dayjs> {
  const businessDays = [];
  let currentDate = startDate;
  while (businessDays.length < beforeCount) {
    currentDate = currentDate.subtract(1, "day");
    if (isBusinessDate(currentDate)) {
      businessDays.unshift(currentDate.clone());
    }
  }
  currentDate = startDate;
  businessDays.push(currentDate.clone());
  while (businessDays.length < beforeCount + afterCount + 1) {
    currentDate = currentDate.add(1, "day");
    if (isBusinessDate(currentDate)) {
      businessDays.push(currentDate.clone());
    }
  }
  return businessDays;
}