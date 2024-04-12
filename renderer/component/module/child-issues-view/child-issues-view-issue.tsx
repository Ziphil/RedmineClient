//

import {faAngleRight} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactElement} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {IdView} from "/renderer/component/module/id-view";
import {IssueWithChildren} from "/renderer/type";
import {aria} from "/renderer/util/data";


export const ChildIssuesViewIssue = create(
  require("./child-issues-view-issue.scss"), "ChildIssuesViewIssue",
  function ({
    issue,
    level
  }: {
    issue: IssueWithChildren,
    level: number
  }): ReactElement {

    return (
      <div styleName="root">
        <div styleName="top">
          <span styleName="indent" {...aria({hidden: true})}>
            {Array.from({length: level}).map((dummy, index) => (
              <span key={index} styleName="indent-item">
                <FontAwesomeIcon icon={faAngleRight}/>
              </span>
            ))}
          </span>
          <span styleName="id">
            <IdView id={issue.id}/>
          </span>
          <TransitionLink styleName="link" to={`/issue/${issue.id}`}>
            <SingleLineText>
              {issue.subject}
            </SingleLineText>
          </TransitionLink>
        </div>
        {(issue.childIssues.length > 0) && (
          <div styleName="list">
            {issue.childIssues.map((childIssue) => (
              <ChildIssuesViewIssue key={childIssue.id} issue={childIssue} level={level + 1}/>
            ))}
          </div>
        )}
      </div>
    );

  }
);