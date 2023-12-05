//

import dayjs from "dayjs";
import {Issue} from "/renderer/type";


export function compareIssue(firstIssue: Issue, secondIssue: Issue): number {
  if (firstIssue.startDate !== secondIssue.startDate) {
    return compareDate(firstIssue.startDate, secondIssue.startDate);
  } else {
    return firstIssue.id - secondIssue.id;
  }
}

function compareDate(firstDate: string | null, secondDate: string | null): number {
  if (firstDate === null && secondDate === null) {
    return 0;
  } else if (firstDate === null) {
    return 1;
  } else if (secondDate === null) {
    return -1;
  } else {
    return dayjs(firstDate).diff(secondDate);
  }
}
