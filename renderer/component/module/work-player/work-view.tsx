//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {IssueSubjectView} from "/renderer/component/module/issue-subject-view";
import {Work} from "/renderer/type";


export const WorkView = create(
  require("./work-view.scss"), "WorkView",
  function ({
    work
  }: {
    work: Work
  }): ReactElement {

    return (
      <div styleName="root">
        <IssueSubjectView issue={work.issue} size="large" environment="dark"/>
      </div>
    );

  }
);