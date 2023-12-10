//

import {faAngleDown} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {DateView} from "/renderer/component/module/date-view";
import {DetailedIssue} from "/renderer/type";
import {data} from "/renderer/util/data";


export const IssueInfoView = create(
  require("./issue-info-view.scss"), "IssueInfoView",
  function ({
    issue,
    size,
    environment = "light"
  }: {
    issue: DetailedIssue,
    size: "medium" | "large",
    environment?: "light" | "dark"
  }): ReactElement {

    return (
      <div styleName="root" {...data({size})}>
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
            <div styleName="info-value">
              {issue.assignedUser?.name ?? "⸺"}
            </div>
          </div>
          <div styleName="info-item">
            <div styleName="info-label">
              依頼者
            </div>
            <div styleName="info-value">
              {issue.requestedUser?.name ?? "⸺"}
            </div>
          </div>
        </div>
        <div styleName="info-row">
          <div styleName="info-item">
            <div styleName="info-label">
              バージョン
            </div>
            <div styleName="info-value">
              {issue.version?.name ?? "⸺"}
            </div>
          </div>
          <div styleName="info-item">
            <div styleName="info-label">
              カテゴリ
            </div>
            <div styleName="info-value">
              {issue.category?.name ?? "⸺"}
            </div>
          </div>
        </div>
      </div>
    );

  }
);