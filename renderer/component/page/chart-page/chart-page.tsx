//

import {ReactElement} from "react";
import {IssueChart} from "/renderer/component/module/issue-chart";
import {PageContainer} from "/renderer/component/module/page-container";
import {useSuspenseQuery} from "/renderer/hook/request";


export const ChartPage = function ({
}: {
}): ReactElement {

  const [issueGroups] = useSuspenseQuery("fetchIssues", window.api.fetchHierarchicalIssues, {});

  return (
    <PageContainer>
      <IssueChart issueGroups={issueGroups} dateCount={20}/>
    </PageContainer>
  );

};