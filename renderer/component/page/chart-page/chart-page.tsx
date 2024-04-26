//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {IssueChart} from "/renderer/component/module/issue-chart";
import {Page} from "/renderer/component/module/page";
import {useSuspenseResponse} from "/renderer/hook/request";


export const ChartPage = create(
  null, "ChartPage",
  function ({
  }: {
  }): ReactElement {

    const [issueGroups] = useSuspenseResponse("fetchHierarchicalIssueGroups", window.api.fetchHierarchicalIssueGroups, {});

    return (
      <Page>
        <IssueChart issueGroups={issueGroups} dateCount={20}/>
      </Page>
    );

  }
);