//

import dayjs from "dayjs";
import {HierarchicalIssue, HierarchicalIssueGroup, Id} from "/renderer/type";


export function compareIssueGroup(firstGroup: HierarchicalIssueGroup, secondGroup: HierarchicalIssueGroup, projectPriorities: Array<[Id, number]>): number {
  const firstPriority = projectPriorities.find(([id]) => id === firstGroup.id)?.[1] ?? 0;
  const secondPriority = projectPriorities.find(([id]) => id === secondGroup.id)?.[1] ?? 0;
  if (firstPriority !== secondPriority) {
    return secondPriority - firstPriority;
  } else {
    return secondGroup.id - firstGroup.id;
  }
}

export function compareIssue(firstIssue: HierarchicalIssue, secondIssue: HierarchicalIssue): number {
  const comparisonByDate = compareIssueByDate(firstIssue, secondIssue);
  if (comparisonByDate !== 0) {
    return comparisonByDate;
  } else {
    return firstIssue.id - secondIssue.id;
  }
}

function compareIssueByDate(firstIssue: HierarchicalIssue, secondIssue: HierarchicalIssue): number {
  const firstHasDate = firstIssue.startDate !== null && firstIssue.dueDate !== null;
  const secondHasDate = secondIssue.startDate !== null && secondIssue.dueDate !== null;
  if (!firstHasDate && !secondHasDate) {
    return 0;
  } else if (!firstHasDate) {
    return 1;
  } else if (!secondHasDate) {
    return -1;
  } else {
    const comparisonByStart = dayjs(firstIssue.startDate).diff(secondIssue.startDate);
    const comparisonByDue = dayjs(firstIssue.dueDate).diff(secondIssue.dueDate);
    if (comparisonByStart !== 0) {
      return comparisonByStart;
    } else {
      return comparisonByDue;
    }
  }
}
