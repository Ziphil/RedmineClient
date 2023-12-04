//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {Issue} from "/main/type";
import {getBusinessDays} from "/renderer/util/date";
import {IssueChartHeader} from "./issue-chart-header";
import {IssueView} from "./issue-view";


const styles = {
  root: css`
    display: flex;
    flex-direction: column;
  `,
  list: css`
    display: flex;
    flex-direction: column;
  `
};

export const IssueChart = function ({
  issues
}: {
  issues: Array<Issue>
}): ReactElement {

  const businessDays = getBusinessDays(dayjs().subtract(7, "day"), 30);

  return (
    <div className={styles.root}>
      <IssueChartHeader businessDays={businessDays}/>
      <ul className={styles.list}>
        {issues.map((issue) => (
          <IssueView key={issue.id} issue={issue} businessDays={businessDays}/>
        ))}
      </ul>
    </div>
  );

};