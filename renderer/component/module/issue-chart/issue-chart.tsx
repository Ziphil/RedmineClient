//

import dayjs from "dayjs";
import {ReactElement, useMemo} from "react";
import SimpleBar from "simplebar-react";
import {create} from "/renderer/component/create";
import {HierarchicalIssueGroup} from "/renderer/type";
import {getBusinessDates} from "/renderer/util/date";
import {IssueChartHeader} from "./issue-chart-header";
import {IssueChartIssueGroup} from "./issue-chart-issue-group";


export const IssueChart = create(
  require("./issue-chart.scss"), "IssueChart",
  function ({
    issueGroups,
    dateCount
  }: {
    issueGroups: Array<HierarchicalIssueGroup>,
    dateCount: number
  }): ReactElement {

    const businessDates = useMemo(() => getBusinessDates(dayjs().startOf("day"), 2, dateCount - 3), [dateCount]);
    const sortedIssueGroups = useMemo(() => [...issueGroups].sort((first, second) => second.id - first.id), [issueGroups]);

    return (
      <div styleName="root">
        <IssueChartHeader issueGroups={issueGroups} businessDates={businessDates}/>
        <SimpleBar styleName="scroll">
          <div styleName="list">
            {sortedIssueGroups.map((issueGroup) => (
              <IssueChartIssueGroup key={issueGroup.id} issueGroup={issueGroup} businessDates={businessDates}/>
            ))}
          </div>
        </SimpleBar>
      </div>
    );

  }
);
