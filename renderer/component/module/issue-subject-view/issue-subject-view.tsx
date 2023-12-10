//

import {faAngleDown, faAnglesRight} from "@fortawesome/pro-regular-svg-icons";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import {Fragment, ReactElement, useCallback} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {create} from "/renderer/component/create";
import {DateView} from "/renderer/component/module/date-view";
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
        {(ancestorIssues !== null) && (
          <div styleName="ancestor" {...data({size})}>
            {ancestorIssues?.map((ancestorIssue, index) => (
              <Fragment key={ancestorIssue.id}>
                <SingleLineText>{ancestorIssue.subject}</SingleLineText>
                <FontAwesomeIcon styleName="hierarchy-arrow" icon={faAnglesRight} {...data({environment})}/>
              </Fragment>
            ))}
          </div>
        )}
        <SingleLineText styleName="subject" {...data({size})}>
          {issue.subject}
        </SingleLineText>
        <div styleName="info" {...data({size})}>
          <div styleName="info-row">
            <div styleName="info-item">
              <div styleName="info-label">
                期間
              </div>
              <div styleName="info-value">
                {(issue.startDate !== null) ? <DateView date={dayjs(issue.startDate)} orientation="horizontal"/> : "未定"}
                <FontAwesomeIcon styleName="info-arrow" icon={faAngleDown}/>
                {(issue.dueDate !== null) ? <DateView date={dayjs(issue.dueDate)} orientation="horizontal"/> : "未定"}
              </div>
            </div>
          </div>
          <div styleName="info-row">
            <div styleName="info-item">
              <div styleName="info-label">
                担当者
              </div>
              <div styleName="infoValue">
                {issue.assignedUser?.name ?? "なし"}
              </div>
            </div>
            <div styleName="info-item">
              <div styleName="info-label">
                依頼者
              </div>
              <div styleName="infoValue">
                {issue.requestedUser?.id ?? "なし"}
              </div>
            </div>
          </div>
          <div styleName="info-row">
            <div styleName="info-item">
              <div styleName="info-label">
                バージョン
              </div>
              <div styleName="infoValue">
                {issue.version?.name ?? "なし"}
              </div>
            </div>
            <div styleName="info-item">
              <div styleName="info-label">
                カテゴリ
              </div>
              <div styleName="infoValue">
                {issue.category?.name ?? "なし"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
);