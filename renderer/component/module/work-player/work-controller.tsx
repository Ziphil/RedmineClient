//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {IconButton} from "/renderer/component/atom/icon-button";
import {Work} from "/renderer/type";


const styles = {
  root: css`
    row-gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  row: css`
    column-gap: 16px;
    display: flex;
  `
};

export const WorkController = function ({
  work
}: {
  work: Work
}): ReactElement {

  return (
    <div className={styles.root}>
      <IconButton icon="&#xF00C;" size="large"/>
      <div className={styles.row}>
        <IconButton icon="&#xF04D;" size="medium"/>
        <IconButton icon="&#xF04C;" size="medium"/>
      </div>
    </div>
  );

};