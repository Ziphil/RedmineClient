//

import {css} from "@linaria/core";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {Project} from "/main/type";
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

export const ProjectView = function ({
  project,
  businessDays
}: {
  project: Project,
  businessDays: Array<Dayjs>
}): ReactElement {

  return (
    <section className={styles.root}>
      <h2 className={styles.name}>{project.name}</h2>
      <ul className={styles.list}>
        {project.issues.map((issue) => (
          <IssueView key={issue.id} issue={issue} level={0} businessDays={businessDays}/>
        ))}
      </ul>
    </section>
  );

};