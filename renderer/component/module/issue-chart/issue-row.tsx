//

import {css} from "@linaria/core";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement, useCallback} from "react";
import {Issue} from "/renderer/type";
import {borderColor, gradientBackground, gradientText, iconFont} from "/renderer/util/css";
import {aria, data} from "/renderer/util/data";


const styles = {
  root: css`
    height: 28px;
    border-block-end: solid 1px ${borderColor()};
    display: grid;
    align-items: center;
    z-index: 0;
    cursor: pointer;
    position: relative;
    &::before {
      inset: 0px;
      ${gradientBackground(0.96)}
      transition: opacity 0.1s ease;
      opacity: 0;
      z-index: -1;
      content: "";
      position: absolute;
    }
    &:hover::before {
      opacity: 1;
    }
  `,
  subjectContainer: css`
    column-gap: 6px;
    display: flex;
    align-items: center;
    grid-column: 1 / 2;
  `,
  id: css`
    width: 3em;
    padding-block: 0.2em;
    font-size: 70%;
    letter-spacing: -0.05em;
    border-radius: 1em;
    ${gradientBackground(0.9)}
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  tracker: css`
    ${gradientText(0.9)}
    flex-grow: 0;
    flex-shrink: 0;
  `,
  subjectRow: css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  indent: css`
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  indentItem: css`
    width: 16px;
    padding-inline-start: 2px;
    flex-grow: 0;
    flex-shrink: 0;
    &::before {
      ${iconFont()}
      ${gradientText(0.8)}
      content: "\uF105";
    }
  `,
  subject: css`
    margin-inline-end: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
    flex-shrink: 1;
    &[data-late] {
      color: hsl(320, 65%, 50%);
    }
  `,
  meter: css`
    height: 16px;
    border-radius: 16px;
    ${gradientBackground(0.6)}
    grid-row: 1;
    &[data-parent] {
      height: 6px;
    }
    &[data-start-overflown] {
      border-start-start-radius: 0px;
      border-end-start-radius: 0px;
    }
    &[data-end-overflown] {
      border-start-end-radius: 0px;
      border-end-end-radius: 0px;
    }
    &:not([data-start-overflown]) {
      margin-inline-start: -2px;
    }
    &:not([data-end-overflown]) {
      margin-inline-end: -2px;
    }
  `,
  arrow: css`
    margin-inline: 4px;
    font-size: 16px;
    ${gradientText(0.6)}
    grid-column-start: 2;
    grid-column-end: -1;
    grid-row: 1;
    display: flex;
    &[data-start-beyond] {
      justify-content: flex-end;
      &::before {
        ${iconFont()}
        content: "\uF061";
      }
    }
    &[data-end-beyond] {
      justify-content: flex-start;
      &::before {
        ${iconFont()}
        content: "\uF060";
      }
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
  businessDates,
  onIssueClick
}: {
  issue: Issue,
  level: number,
  parent: boolean,
  businessDates: Array<Dayjs>,
  onIssueClick: (issue: Issue) => unknown
}): ReactElement {

  const [startIndex, startOverflown, startBeyond] = calcStartIndex(issue, businessDates);
  const [endIndex, endOverflown, endBeyond] = calcEndIndex(issue, businessDates);
  const late = issue.dueDate !== null && dayjs().isAfter(issue.dueDate, "day");

  const handleClick = useCallback(function (): void {
    onIssueClick(issue);
  }, [issue, onIssueClick]);

  return (
    <button className={styles.root} type="button" onClick={handleClick} style={{gridTemplateColumns: `1fr repeat(${businessDates.length}, 36px)`}}>
      <div className={styles.subjectContainer}>
        <span className={styles.id}>
          {issue.id}
        </span>
        <span className={styles.subjectRow}>
          <span className={styles.indent} {...aria({hidden: true})}>
            {Array.from({length: level}).map((dummy, index) => (
              <span key={index} className={styles.indentItem}/>
            ))}
          </span>
          <span className={styles.subject} {...data({late})}>
            {issue.subject}
          </span>
        </span>
      </div>
      <div className={styles.border}>
        {businessDates.map((day, index) => (
          <div
            className={styles.borderItem}
            key={day.format("YYYY-MM-DD")}
            style={{gridColumnStart: index + 2, gridColumnEnd: index + 2}}
            {...data({today: day.isSame(dayjs(), "day")})}
            {...aria({hidden: true})}
          />
        ))}
      </div>
      {(startIndex !== null && endIndex !== null) && (
        (!startBeyond && !endBeyond) ? (
          <div
            className={styles.meter}
            style={{gridColumnStart: startIndex + 2, gridColumnEnd: endIndex + 2}}
            {...data({parent, startOverflown, endOverflown})}
            {...aria({hidden: true})}
          />
        ) : (
          <div
            className={styles.arrow}
            {...data({parent, startBeyond, endBeyond})}
            {...aria({hidden: true})}
          />
        )
      )}
    </button>
  );

};


function calcStartIndex(issue: Issue, businessDates: Array<Dayjs>): [number | null, boolean, boolean] {
  if (issue.startDate !== null) {
    const rawIndex = businessDates.findIndex((date) => date.isSame(issue.startDate, "day") || date.isAfter(issue.startDate, "day"));
    const index = (rawIndex < 0) ? 0 : rawIndex;
    const overflown = businessDates[0].isAfter(issue.startDate, "day");
    const beyond = businessDates[businessDates.length - 1].isBefore(issue.startDate, "day");
    return [index, overflown, beyond];
  } else {
    return [null, false, false];
  }
}

function calcEndIndex(issue: Issue, businessDates: Array<Dayjs>): [number | null, boolean, boolean] {
  if (issue.dueDate !== null) {
    const rawIndex = businessDates.findIndex((date) => date.isAfter(issue.dueDate, "day"));
    const index = (rawIndex < 0) ? businessDates.length : rawIndex;
    const overflown = businessDates[businessDates.length - 1].isBefore(issue.dueDate, "day");
    const beyond = businessDates[0].isAfter(issue.dueDate, "day");
    return [index, overflown, beyond];
  } else {
    return [null, false, false];
  }
}