//

import {css} from "@linaria/core";
import {ReactElement, useCallback} from "react";
import {IconButton} from "/renderer/component/atom/icon-button";
import {Work} from "/renderer/type";


const styles = {
  root: css`
    row-gap: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  row: css`
    column-gap: 12px;
    display: flex;
  `
};

export const WorkController = function ({
  work,
  onPunch,
  onPause,
  onCancel
}: {
  work: Work,
  onPunch: (done: boolean) => unknown,
  onPause: () => unknown,
  onCancel: () => unknown
}): ReactElement {

  const handlePunchAndDone = useCallback(function (): void {
    onPunch(true);
  }, [onPunch]);

  const handlePunchWithoutDone = useCallback(function (): void {
    onPunch(false);
  }, [onPunch]);

  return (
    <div className={styles.root}>
      <IconButton icon={"\uF00C"} size="large" environment="dark" onClick={handlePunchAndDone}/>
      <div className={styles.row}>
        <IconButton icon={"\uF04D"} size="medium" environment="dark" onClick={handlePunchWithoutDone}/>
        <IconButton icon={(work.startDate !== null) ? "\uF04C" : "\uF04B"} size="medium" environment="dark" onClick={onPause}/>
        <IconButton icon={"\uF05E"} size="medium" environment="dark" onClick={onCancel}/>
      </div>
    </div>
  );

};