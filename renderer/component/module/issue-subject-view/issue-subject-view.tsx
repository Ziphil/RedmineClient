//

import {faAngleDown} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {DateView} from "/renderer/component/module/date-view";
import {IdView} from "/renderer/component/module/id-view";
import {Issue} from "/renderer/type";
import {gradientBackground} from "/renderer/util/css";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
    flex-grow: 1;
    flex-shrink: 1;
  `,
  complement: css`
    column-gap: 1em;
    font-size: 50%;
    display: flex;
    align-items: center;
    &[data-size="medium"] {
      font-size: 20px;
    }
    &[data-size="large"] {
      font-size: 24px;
    }
  `,
  project: css`
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &[data-size="medium"] {
      margin-block-start: 8px;
      font-size: 20px;
    }
    &[data-size="large"] {
      margin-block-start: 12px;
      font-size: 24px;
    }
  `,
  subject: css`
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &[data-size="medium"] {
      margin-block-start: 8px;
      font-size: 32px;
    }
    &[data-size="large"] {
      margin-block-start: 12px;
      font-size: 44px;
    }
  `,
  info: css`
    padding-block: 8px;
    padding-inline: 6px;
    margin-block-start: 12px;
    column-gap: 20px;
    font-size: 14px;
    border-radius: 4px;
    display: flex;
    ${gradientBackground(0.96)}
    &[data-size="large"] {
      display: none;
    }
  `,
  infoRow: css`
    row-gap: 8px;
    display: flex;
    flex-direction: column;
  `,
  infoItem: css`
    row-gap: 4px;
    display: flex;
    flex-direction: column;
  `,
  infoLabel: css`
    font-size: 12px;
    font-weight: bold;
  `,
  infoValue: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  arrow: css`
    margin-block-start: 2px;
    margin-block-end: -2px;
    margin-inline-start: 2px;  
  `
};

export const IssueSubjectView = function ({
  issue,
  size,
  environment = "light"
}: {
  issue: Issue,
  size: "medium" | "large",
  environment?: "light" | "dark"
}): ReactElement {

  return (
    <div className={styles.root}>
      <div className={styles.complement} {...data({size})}>
        <IdView id={issue.id} environment={environment}/>
      </div>
      <div className={styles.project} {...data({size})}>
        {issue.project.name}
      </div>
      <div className={styles.subject} {...data({size})}>
        {issue.subject}
      </div>
      <div className={styles.info} {...data({size})}>
        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>
              期日
            </div>
            <div className={styles.infoValue}>
              {(issue.startDate !== null) ? <DateView date={dayjs(issue.startDate)} orientation="horizontal"/> : "未定"}
              <FontAwesomeIcon className={styles.arrow} icon={faAngleDown}/>
              {(issue.startDate !== null) ? <DateView date={dayjs(issue.startDate)} orientation="horizontal"/> : "未定"}
            </div>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>
              担当者
            </div>
            <div className={styles.infoValue}>
              {issue.assignedUser?.name ?? "なし"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>
              依頼者
            </div>
            <div className={styles.infoValue}>
              {issue.requestedUser?.id ?? "なし"}
            </div>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>
              バージョン
            </div>
            <div className={styles.infoValue}>
              {issue.version?.name ?? "なし"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>
              カテゴリ
            </div>
            <div className={styles.infoValue}>
              {issue.category?.name ?? "なし"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};