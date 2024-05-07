//

import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {IdView} from "/renderer/component/module/id-view";
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
                    <span styleName="id">
                      <IdView id={issue.id}/>
                    </span>
                    <TransitionLink styleName="link" to={`/issue/${issue.id}`}>
                      <SingleLineText>
                        {issue.subject}
                      </SingleLineText>
                    </TransitionLink>
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