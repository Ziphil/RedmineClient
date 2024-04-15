//

import {ReactElement} from "react";
import {useParams} from "react-router-dom";
import {create} from "/renderer/component/create";
import {IssueView} from "/renderer/component/module/issue-view";
import {PageContainer} from "/renderer/component/module/page-container";
import {useSuspenseResponse} from "/renderer/hook/request";
import {Id} from "/renderer/type/common";


export const IssuePage = create(
  require("./issue-page.scss"), "IssuePage",
  function ({
  }: {
  }): ReactElement {

    const {idString} = useParams();
    const id = +(idString ?? "1") as Id;

    const [issue] = useSuspenseResponse("fetchIssue", window.api.fetchIssue, {id});
    const [ancestorIssues] = useSuspenseResponse("fetchAncestorIssues", window.api.fetchAncestorIssues, {id});
    const [childIssues] = useSuspenseResponse("fetchDescendantIssues", window.api.fetchDescendantIssues, {id});

    return (
      <PageContainer>
        <IssueView issue={issue} ancestorIssues={ancestorIssues} childIssues={childIssues}/>
      </PageContainer>
    );

  }
);