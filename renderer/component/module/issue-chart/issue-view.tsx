//

import {css} from "@linaria/core";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {Issue} from "/main/type";


const styles = {
  root: css`
    display: contents;
  `,
  subject: css`
    grid-column: 1 / 2;
  `,
  meter: css`
    background-color: red;
  `
};

export const IssueView = function ({
  issue,
  businessDays
}: {
  issue: Issue,
  businessDays: Array<Dayjs>
}): ReactElement {

  const startIndex = calcStartIndex(issue, businessDays);
  const endIndex = calcEndIndex(issue, businessDays);

  return (
    <div className={styles.root}>
      <div className={styles.subject}>{issue.subject}</div>
      {(startIndex !== null && endIndex !== null) && (
        <div className={styles.meter} style={{gridColumn: `${startIndex + 2} / ${endIndex + 2}`}}/>
      )}
    </div>
  );

};


function calcStartIndex(issue: Issue, businessDays: Array<Dayjs>): number | null {
  if (issue.startDate !== null) {
    const rawStartIndex = businessDays.findIndex((day) => day.isSame(issue.startDate, "day") || day.isAfter(issue.startDate, "day"));
    const startIndex = (rawStartIndex < 0) ? 0 : rawStartIndex;
    return startIndex;
  } else {
    return null;
  }
}

function calcEndIndex(issue: Issue, businessDays: Array<Dayjs>): number | null {
  if (issue.dueDate !== null) {
    const rawEndIndex = businessDays.findIndex((day) => day.isAfter(issue.dueDate, "day")) - 1;
    const endIndex = (rawEndIndex < 0) ? businessDays.length - 1 : rawEndIndex;
    return endIndex;
  } else {
    return null;
  }
}