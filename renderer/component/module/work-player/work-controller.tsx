//

import {faPause, faPlay, faStop, faXmark} from "@fortawesome/pro-solid-svg-icons";
import dayjs from "dayjs";
import {ReactElement, useCallback} from "react";
import {IconButton} from "/renderer/component/atom/icon-button";
import {create} from "/renderer/component/create";
import {invalidateQueries} from "/renderer/hook/request";
import {useWork} from "/renderer/hook/work";
import {Work} from "/renderer/type";


export const WorkController = create(
  require("./work-controller.scss"), "WorkController",
  function ({
    work
  }: {
    work: Work
  }): ReactElement {

    const [, setWork] = useWork();

    const punch = useCallback(async function (): Promise<void> {
      if (work !== null) {
        const time = ((work.startDate !== null) ? dayjs().diff(work.startDate, "millisecond") : 0) + work.additionalTime;
        await window.api.addSpentTime({issueId: work.issue.id, time});
        await Promise.all([
          invalidateQueries("fetchIssues"),
          invalidateQueries("fetchIssue", (arg) => arg.id === work.issue.id)
        ]);
        setWork(null);
      }
    }, [work, setWork]);

    const pause = useCallback(function (): void {
      if (work !== null) {
        if (work.startDate !== null) {
          const time = dayjs().diff(work.startDate, "millisecond");
          setWork({...work, startDate: null, additionalTime: work.additionalTime + time});
        } else {
          setWork({...work, startDate: dayjs()});
        }
      }
    }, [work, setWork]);

    const cancel = useCallback(function (): void {
      setWork(null);
    }, [setWork]);

    return (
      <div styleName="root">
        <IconButton icon={faStop} size="large" color="purple" environment="background" onClick={punch}/>
        <div styleName="row">
          <IconButton icon={(work?.startDate !== null) ? faPause : faPlay} size="medium" color="blue" environment="background" onClick={pause}/>
          <IconButton icon={faXmark} size="medium" color="pink" environment="background" onClick={cancel}/>
        </div>
      </div>
    );

  }
);