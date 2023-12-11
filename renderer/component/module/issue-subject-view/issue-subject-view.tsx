//

import {faAnglesRight} from "@fortawesome/pro-regular-svg-icons";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Fragment, ReactElement, useCallback} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {IdView} from "/renderer/component/module/id-view";
import {StatusView} from "/renderer/component/module/status-view";
import {Issue} from "/renderer/type";
import {data} from "/renderer/util/data";


export const IssueSubjectView = create(
  require("./issue-subject-view.scss"), "IssueSubjectView",
  function ({
    issue,
    ancestorIssues,
    size,
    environment = "light"
  }: {
    issue: Issue,
    ancestorIssues?: Array<Issue>,
    size: "medium" | "large",
    environment?: "light" | "dark"
  }): ReactElement {

    const openExternal = useCallback(function (): void {
      window.api.send("open-external", `${process.env["REDMINE_URL"]}/issues/${issue.id}`);
    }, [issue.id]);

    return (
      <div styleName="root">
        <div styleName="complement" {...data({size})}>
          <IdView id={issue.id} environment={environment}/>
          <span styleName="complement-extra" {...data({size})}>
            <StatusView status={issue.status}/>
            <button styleName="external" onClick={openExternal}>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
            </button>
          </span>
        </div>
        <div styleName="project" {...data({size})}>
          <SingleLineText>{issue.project.name}</SingleLineText>
          <FontAwesomeIcon styleName="hierarchy-arrow" icon={faAnglesRight} {...data({environment})}/>
        </div>
        {(ancestorIssues !== undefined && ancestorIssues.length > 0) && (
          <div styleName="ancestor" {...data({size})}>
            {ancestorIssues.map((ancestorIssue, index) => (
              <Fragment key={ancestorIssue.id}>
                <TransitionLink styleName="link" to={`/issue/${ancestorIssue.id}`} {...data({environment})}>
                  <SingleLineText>
                    {ancestorIssue.subject}
                  </SingleLineText>
                </TransitionLink>
                <FontAwesomeIcon styleName="hierarchy-arrow" icon={faAnglesRight} {...data({environment})}/>
              </Fragment>
            ))}
          </div>
        )}
        <div styleName="subject" {...data({size})}>
          <TransitionLink styleName="link" to={`/issue/${issue.id}`} {...data({environment})}>
            <SingleLineText>
              {issue.subject}
            </SingleLineText>
          </TransitionLink>
        </div>
      </div>
    );

  }
);