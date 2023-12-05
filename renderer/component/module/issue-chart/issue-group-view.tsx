//

import {css} from "@linaria/core";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {Issue, IssueGroup} from "/renderer/type";
import {borderColor} from "/renderer/util/css";
import {IssueView} from "./issue-view";


const styles = {
  root: css`
    margin-block-start: 12px;
    display: flex;
    flex-direction: column;
  `,
  name: css`
    padding-block: 4px; 
    font-size: 12px;
    font-weight: bold;
    border-block-end: solid 1px ${borderColor()};
  `,
  list: css`
    display: flex;
    flex-direction: column;
  `
};

export const IssueGroupView = function ({
  issueGroup,
  businessDates,
  onIssueClick
}: {
  issueGroup: IssueGroup,
  businessDates: Array<Dayjs>,
  onIssueClick: (issue: Issue) => unknown
}): ReactElement {

  return (
    <section className={styles.root}>
      <h2 className={styles.name}>{issueGroup.name}</h2>
      <ul className={styles.list}>
        {issueGroup.issues.map((issue) => (
          <IssueView key={issue.id} issue={issue} level={0} businessDates={businessDates} onIssueClick={onIssueClick}/>
        ))}
      </ul>
    </section>
  );

};