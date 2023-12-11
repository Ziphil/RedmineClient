//

import {faAngleDown} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {DateView} from "/renderer/component/module/date-view";
import {useQuery} from "/renderer/hook/request";
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

    const [assignedUser] = useQuery("fetchUser", window.api.fetchUser, {id: issue.assignedUser!.id}, {enabled: issue.assignedUser !== null});
    const [requestedUser] = useQuery("fetchUser", window.api.fetchUser, {id: issue.requestedUser!.id}, {enabled: issue.requestedUser !== null});

    return (
      <div styleName="root" {...data({size})}>
        <div styleName="row">
          <div styleName="item">
            <div styleName="label">
              期間
            </div>
            <div styleName="value" {...data({orientation: "vertical"})}>
              {(issue.startDate !== null) ? <DateView date={dayjs(issue.startDate)} orientation="horizontal"/> : "未定"}
              <FontAwesomeIcon styleName="arrow" icon={faAngleDown}/>
              {(issue.dueDate !== null) ? <DateView date={dayjs(issue.dueDate)} orientation="horizontal"/> : "未定"}
            </div>
          </div>
        </div>
        <div styleName="row">
          <div styleName="item">
            <div styleName="label">
              担当者
            </div>
            <div styleName="value">
              <img styleName="avatar" src={assignedUser?.avatarUrl ?? ""} alt=""/>
              {issue.assignedUser?.name ?? "⸺"}
            </div>
          </div>
          <div styleName="item">
            <div styleName="label">
              依頼者
            </div>
            <div styleName="value">
              <img styleName="avatar" src={requestedUser?.avatarUrl ?? ""} alt=""/>
              {issue.requestedUser?.name ?? "⸺"}
            </div>
          </div>
        </div>
        <div styleName="row">
          <div styleName="item">
            <div styleName="label">
              バージョン
            </div>
            <div styleName="value">
              {issue.version?.name ?? "⸺"}
            </div>
          </div>
          <div styleName="item">
            <div styleName="label">
              カテゴリ
            </div>
            <div styleName="value">
              {issue.category?.name ?? "⸺"}
            </div>
          </div>
        </div>
      </div>
    );

  }
);