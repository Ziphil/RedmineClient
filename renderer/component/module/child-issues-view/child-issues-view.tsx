//

import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {create} from "/renderer/component/create";
import {ChildIssuesViewIssue} from "/renderer/component/module/child-issues-view/child-issues-view-issue";
import {IssueWithChildren} from "/renderer/type";


export const ChildIssuesView = create(
  require("./child-issues-view.scss"), "ChildIssuesView",
  function ({
    childIssues
  }: {
    childIssues: Array<IssueWithChildren>
  }): ReactElement {

    return (
      <div styleName="root">
        <SimpleBar styleName="scroll">
          <div styleName="list">
            <div styleName="label">
              子タスク
            </div>
            {childIssues.map((issue) => (
              <ChildIssuesViewIssue key={issue.id} issue={issue} level={0}/>
            ))}
          </div>
        </SimpleBar>
      </div>
    );

  }
);