//

import dayjs from "dayjs";
import {ReactElement} from "react";
import {useParams} from "react-router-dom";
import {create} from "/renderer/component/create";
import {ActivityFullView} from "/renderer/component/module/activity-full-view";
import {Page} from "/renderer/component/module/page";
import {useSuspenseResponse} from "/renderer/hook/request";


export const ActivityPage = create(
  require("./activity-page.scss"), "ActivityPage",
  function ({
  }: {
  }): ReactElement {

    const {date} = useParams();

    const [activities] = useSuspenseResponse("fetchActivities", window.api.fetchActivities, {date: date!});

    return (
      <Page>
        <ActivityFullView date={dayjs(date)} activities={activities}/>
      </Page>
    );

  }
);