//

import {ReactElement, useMemo} from "react";
import SimpleBar from "simplebar-react";
import {create} from "/renderer/component/create";
import {useSettings} from "/renderer/hook/settings";
import {useToday} from "/renderer/hook/today";
import {HierarchicalIssueGroup} from "/renderer/type";
import {getBusinessDates} from "/renderer/util/date";
import {compareIssueGroup} from "/renderer/util/issue";
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

    const {exceptionalOffDates, projectPriorities} = useSettings();
    const today = useToday();

    const businessDates = useMemo(() => {
      return getBusinessDates(today, exceptionalOffDates, 2, dateCount - 3);
    }, [dateCount, exceptionalOffDates, today]);
    const sortedIssueGroups = useMemo(() => {
      return [...issueGroups].sort((first, second) => compareIssueGroup(first, second, projectPriorities));
    }, [issueGroups, projectPriorities]);

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
