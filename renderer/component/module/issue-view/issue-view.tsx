//

import {ReactElement} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {IdView} from "/renderer/component/module/id-view";
import {Issue} from "/renderer/type";


export const IssueView = create(
  require("./issue-view.scss"), "IssueView",
  function ({
    issue
  }: {
    issue: Issue
  }): ReactElement {

    return (
      <span styleName="root">
        <span styleName="id">
          <IdView id={issue.id}/>
        </span>
        <TransitionLink styleName="link" to={`/issue/${issue.id}`}>
          <SingleLineText>
            {issue.subject}
          </SingleLineText>
        </TransitionLink>
      </span>
    );

  }
);