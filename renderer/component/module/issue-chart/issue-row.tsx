//

import {css} from "@linaria/core";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {Issue} from "/main/type";
import {data} from "/renderer/util/data";
import {borderColor, gradientBackground} from "/renderer/util/css";


const styles = {
  root: css`
    height: 28px;
    border-block-end: solid 1px ${borderColor()};
    grid-template-columns: 30% repeat(25, 1fr);
    display: grid;
    align-items: center;
    z-index: 0;
    position: relative;
    &::before {
      inset: 0px;
      ${gradientBackground(0.96)}
      opacity: 0;
      transition: opacity 0.1s ease;
      content: "";
      z-index: -1;
      position: absolute;
    }
    &:hover::before {
      opacity: 1;
    }
  `,
  subjectContainer: css`
    display: flex;
    align-items: center;
    grid-column: 1 / 2;
  `,
  id: css`
    width: 3em;
    padding-block: 0.1em;
    margin-inline-end: 6px;
    font-size: 12px;
    letter-spacing: -0.05em;
    border-radius: 1em;
    ${gradientBackground(0.9)}
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  indent: css`
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  indentItem: css`
    width: 12px;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  subject: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  meter: css`
    height: 16px;
    border-radius: 4px;
    ${gradientBackground(0.6)}
    grid-row: 1;
    &[data-parent] {
      height: 8px;
    }
    &[data-start-overflown] {
      border-start-start-radius: 0px;
      border-end-start-radius: 0px;
    }
    &[data-end-overflown] {
      border-start-end-radius: 0px;
      border-end-end-radius: 0px;
    }
  `,
  border: css`
    display: contents;
  `,
  borderItem: css`
    height: 100%;
    border-inline-start: solid 1px ${borderColor()};
    grid-row: 1;
    &:last-of-type {
      border-inline-end: solid 1px ${borderColor()};
    }
    &[data-today] {
      ${gradientBackground(0.92)}
    }
  `
};

export const IssueRow = function ({
  issue,
  level,
  parent,
  businessDays
}: {
  issue: Issue,
  level: number,
  parent: boolean,
  businessDays: Array<Dayjs>
}): ReactElement {

  const [startIndex, startOverflown] = calcStartIndex(issue, businessDays);
  const [endIndex, endOverflown] = calcEndIndex(issue, businessDays);

  return (
    <li className={styles.root}>
      <div className={styles.subjectContainer}>
        <span className={styles.id}>{issue.id}</span>
        <span className={styles.indent}>
          {Array.from({length: level}).map((dummy, index) => (
            <span key={index} className={styles.indentItem}/>
          ))}
        </span>
        <span className={styles.subject}>{issue.subject}</span>
      </div>
      <div className={styles.border}>
        {businessDays.map((day, index) => (
          <div
            className={styles.borderItem}
            key={day.format("YYYY-MM-DD")}
            style={{gridColumnStart: index + 2, gridColumnEnd: index + 3}}
            {...data({today: day.isSame(dayjs(), "day")})}
          />
        ))}
      </div>
      {(startIndex !== null && endIndex !== null) && (
        <div
          className={styles.meter}
          style={{gridColumnStart: startIndex + 2, gridColumnEnd: endIndex + 3}}
          {...data({parent, startOverflown, endOverflown})}
        />
      )}
    </li>
  );

};


function calcStartIndex(issue: Issue, businessDays: Array<Dayjs>): [number | null, boolean] {
  if (issue.startDate !== null) {
    const rawStartIndex = businessDays.findIndex((day) => day.isSame(issue.startDate, "day") || day.isAfter(issue.startDate, "day"));
    const startIndex = (rawStartIndex < 0) ? 0 : rawStartIndex;
    const startOverflown = businessDays[0].isAfter(issue.startDate, "day");
    return [startIndex, startOverflown];
  } else {
    return [null, false];
  }
}

function calcEndIndex(issue: Issue, businessDays: Array<Dayjs>): [number | null, boolean] {
  if (issue.dueDate !== null) {
    const rawEndIndex = businessDays.findIndex((day) => day.isAfter(issue.dueDate, "day")) - 1;
    const endIndex = (rawEndIndex < 0) ? businessDays.length - 1 : rawEndIndex;
    const endOverflown = businessDays[businessDays.length - 1].isBefore(issue.dueDate, "day");
    return [endIndex, endOverflown];
  } else {
    return [null, false];
  }
}