//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useMemo} from "react";
import {Project} from "/main/type";
import {getBusinessDays} from "/renderer/util/date";
import {IssueChartHeader} from "./issue-chart-header";
import {ProjectView} from "./project-view";


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
  projects
}: {
  projects: Array<Project>
}): ReactElement {

  const businessDays = useMemo(() => getBusinessDays(dayjs().startOf("day"), 2, 22), []);

  return (
    <div className={styles.root}>
      <IssueChartHeader businessDays={businessDays}/>
      <div className={styles.list}>
        {projects.map((project) => (
          <ProjectView key={project.id} project={project} businessDays={businessDays}/>
        ))}
      </div>
    </div>
  );

};