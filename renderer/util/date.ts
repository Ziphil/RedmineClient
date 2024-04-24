//

import holidayJp from "@holiday-jp/holiday_jp";
import {Dayjs} from "dayjs";


export function isOffDate(date: Dayjs, exceptionalOffDates: Array<string>): boolean {
  return date.day() === 0 || date.day() === 6 || holidayJp.isHoliday(date.toDate()) || exceptionalOffDates.includes(date.format("YYYY-MM-DD"));
}

export function isBusinessDate(date: Dayjs, exceptionalOffDates: Array<string>): boolean {
  return !isOffDate(date, exceptionalOffDates);
}

export function getBusinessDates(startDate: Dayjs, exceptionalOffDates: Array<string>, beforeCount: number, afterCount: number): Array<Dayjs> {
  const businessDays = [];
  let currentDate = startDate;
  while (businessDays.length < beforeCount) {
    currentDate = currentDate.subtract(1, "day");
    if (isBusinessDate(currentDate, exceptionalOffDates)) {
      businessDays.unshift(currentDate.clone());
    }
  }
  currentDate = startDate;
  businessDays.push(currentDate.clone());
  while (businessDays.length < beforeCount + afterCount + 1) {
    currentDate = currentDate.add(1, "day");
    if (isBusinessDate(currentDate, exceptionalOffDates)) {
      businessDays.push(currentDate.clone());
    }
  }
  return businessDays;
}