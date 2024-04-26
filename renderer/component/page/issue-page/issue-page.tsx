//

import {ReactElement} from "react";
import {useParams} from "react-router-dom";
import {create} from "/renderer/component/create";
import {IssueView} from "/renderer/component/module/issue-view";
import {Page} from "/renderer/component/module/page";
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

    return (
      <Page>
        <IssueView issue={issue} ancestorIssues={ancestorIssues}/>
      </Page>
    );

  }
);