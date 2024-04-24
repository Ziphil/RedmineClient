//

import {faAngleDown} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {DateView} from "/renderer/component/module/date-view";
import {useResponse} from "/renderer/hook/request";
import {Id, IssueWithDetails} from "/renderer/type";
import {data} from "/renderer/util/data";


export const IssueInfoView = create(
  require("./issue-info-view.scss"), "IssueInfoView",
  function ({
    issue,
    size,
    environment = "light"
  }: {
    issue: IssueWithDetails,
    size: "medium" | "large",
    environment?: "light" | "dark"
  }): ReactElement {

    const [assignedUser] = useResponse("fetchUser", window.api.fetchUser, {id: issue.assignedUser?.id ?? 1 as Id}, {enabled: issue.assignedUser !== null});
    const [requestedUser] = useResponse("fetchUser", window.api.fetchUser, {id: issue.requestedUser?.id ?? 1 as Id}, {enabled: issue.requestedUser !== null});

    return (
      <article styleName="root" {...data({size})}>
        <div styleName="row">
          <section styleName="item">
            <h3 styleName="label">期間</h3>
            <div styleName="value" {...data({orientation: "vertical"})}>
              {(issue.startDate !== null) ? <DateView date={dayjs(issue.startDate)} orientation="horizontal"/> : "未定"}
              <FontAwesomeIcon styleName="arrow" icon={faAngleDown}/>
              {(issue.dueDate !== null) ? <DateView date={dayjs(issue.dueDate)} orientation="horizontal"/> : "未定"}
            </div>
          </section>
        </div>
        <div styleName="row">
          <section styleName="item">
            <h3 styleName="label">担当者</h3>
            <div styleName="value">
              <img styleName="avatar" src={assignedUser?.avatarUrl ?? ""} alt=""/>
              {issue.assignedUser?.name ?? "⸺"}
            </div>
          </section>
          <section styleName="item">
            <h3 styleName="label">依頼者</h3>
            <div styleName="value">
              <img styleName="avatar" src={requestedUser?.avatarUrl ?? ""} alt=""/>
              {issue.requestedUser?.name ?? "⸺"}
            </div>
          </section>
        </div>
        <div styleName="row">
          <section styleName="item">
            <h3 styleName="label">バージョン</h3>
            <div styleName="value">
              {issue.version?.name ?? "⸺"}
            </div>
          </section>
          <section styleName="item">
            <h3 styleName="label">カテゴリ</h3>
            <div styleName="value">
              {issue.category?.name ?? "⸺"}
            </div>
          </section>
        </div>
      </article>
    );

  }
);