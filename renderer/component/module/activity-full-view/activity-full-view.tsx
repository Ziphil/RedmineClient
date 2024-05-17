//

import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {create} from "/renderer/component/create";
import {ActivityList} from "/renderer/component/module/activity-list";
import {DateView} from "/renderer/component/module/date-view";
import {Activity} from "/renderer/type";


export const ActivityFullView = create(
  require("./activity-full-view.scss"), "ActivityFullView",
  function ({
    date,
    activities
  }: {
    date: Dayjs,
    activities: Array<Activity>
  }): ReactElement {

    return (
      <div styleName="root">
        <div styleName="top">
          <div styleName="date">
            <DateView date={date} orientation="horizontal"/>
          </div>
        </div>
        <div styleName="bottom">
          <SimpleBar styleName="scroll">
            <article styleName="article">
              <h3 styleName="heading">作業時間記録</h3>
              <ActivityList activities={activities}/>
            </article>
          </SimpleBar>
        </div>
      </div>
    );

  }
);