//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {IssueChart} from "/renderer/component/module/issue-chart";
import {PageContainer} from "/renderer/component/module/page-container";
import {useSuspenseResponse} from "/renderer/hook/request";


export const ChartPage = create(
  null, "ChartPage",
  function ({
  }: {
  }): ReactElement {

    const [issueGroups] = useSuspenseResponse("fetchHierarchicalIssues", window.api.fetchHierarchicalIssues, {});

    return (
      <PageContainer>
        <IssueChart issueGroups={issueGroups} dateCount={20}/>
      </PageContainer>
    );

  }
);