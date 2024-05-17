//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Activity} from "/renderer/type";
import {TimeActivityItem} from "./time-activity-item";


export const ActivityList = create(
  require("./activity-list.scss"), "ActivityList",
  function ({
    activities
  }: {
    activities: Array<Activity>
  }): ReactElement {

    return (
      <div styleName="root">
        {activities.map((activity) => activity.type === "time" ? (
          <TimeActivityItem key={`${activity.type}-${activity.id}`} activity={activity}/>
        ) : null)}
      </div>
    );

  }
);