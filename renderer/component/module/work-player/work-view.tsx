//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {DateView} from "/renderer/component/module/date-view";
import {IdView} from "/renderer/component/module/id-view";
import {Work} from "/renderer/type";
import {iconFont} from "/renderer/util/css";


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
  project: css`
    margin-block-start: 12px;
    font-size: 24px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  subject: css`
    margin-block-start: 10px;
    font-size: 40px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  date: css`
    margin-block-start: 16px;
    column-gap: 8px;
    font-size: 16px;
    display: flex;
    align-items: center;
    display: none;
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
        <IdView id={work.issue.id} environment="dark"/>
      </div>
      <div className={styles.project}>
        {work.issue.project.name}
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