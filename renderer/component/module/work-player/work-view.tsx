//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {DateView} from "/renderer/component/module/date-view";
import {TrackerIcon} from "/renderer/component/module/tracker-icon";
import {Work} from "/renderer/type";
import {gradientBackground, gradientText, iconFont} from "/renderer/util/css";


const styles = {
  root: css`
    flex-grow: 1;
    flex-shrink: 1;
  `,
  complement: css`
    column-gap: 8px;
    font-size: 24px;
    display: flex;
    align-items: center;
  `,
  id: css`
    width: 3em;
    padding-block: 0.2em;
    font-size: 70%;
    letter-spacing: -0.05em;
    border-radius: 1em;
    ${gradientBackground(0.65)}
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  tracker: css`
    ${gradientText(0.65)}
  `,
  subject: css`
    margin-block-start: 8px;
    font-size: 40px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  date: css`
    margin-block-start: 12px;
    column-gap: 8px;
    font-size: 16px;
    display: flex;
    align-items: center;
  `,
  dateArrow: css`
    font-size: 24px;
    &::before {
      ${iconFont()}
      content: "\uF101";
    }
  `
};

export const WorkView = function ({
  work
}: {
  work: Work
}): ReactElement {

  return (
    <div className={styles.root}>
      <div className={styles.complement}>
        <span className={styles.id}>{work.issue.id}</span>
        <span className={styles.tracker}><TrackerIcon tracker={work.issue.tracker}/></span>
      </div>
      <div className={styles.subject}>
        {work.issue.subject}
      </div>
      {(work.issue.startDate !== null && work.issue.dueDate !== null) && (
        <div className={styles.date}>
          <DateView date={dayjs(work.issue.startDate)}/>
          <div className={styles.dateArrow}/>
          <DateView date={dayjs(work.issue.dueDate)}/>
        </div>
      )}
    </div>
  );

};