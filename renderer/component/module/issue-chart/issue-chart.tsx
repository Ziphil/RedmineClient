//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {Issue} from "/main/type";
import {getBusinessDays} from "/renderer/util/date";
import {IssueView} from "./issue-view";


const styles = {
  root: css`
    display: grid;
    grid-template-columns: 30% repeat(30, 1fr);
  `
};

export const IssueChart = function ({
  issues
}: {
  issues: Array<Issue>
}): ReactElement {

  const businessDays = getBusinessDays(dayjs().subtract(7, "day"), 30);

  return (
    <ul className={styles.root}>
      {issues.map((issue) => (
        <IssueView key={issue.id} issue={issue} businessDays={businessDays}/>
      ))}
    </ul>
  );

};