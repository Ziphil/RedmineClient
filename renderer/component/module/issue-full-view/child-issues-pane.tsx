//

import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {create} from "/renderer/component/create";
import {IssueView} from "/renderer/component/module/issue-view";
import {useResponse} from "/renderer/hook/request";
import {Issue} from "/renderer/type";


export const ChildIssuesPane = create(
  require("./child-issues-pane.scss"), "ChildIssuesPane",
  function ({
    issue
  }: {
    issue: Issue
  }): ReactElement {

    const [childIssues] = useResponse("fetchChildIssues", window.api.fetchChildIssues, {id: issue.id});

    return (
      <div styleName="root">
        <SimpleBar styleName="scroll">
          <section styleName="inner">
            <h3 styleName="label">子タスク</h3>
            {(childIssues !== undefined) && (
              <ul styleName="value">
                {childIssues.map((issue) => (
                  <li styleName="item" key={issue.id}>
                    <IssueView issue={issue}/>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </SimpleBar>
      </div>
    );

  }
);