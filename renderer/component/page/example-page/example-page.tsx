//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {useSuspenseQuery} from "/renderer/hook/request";


const styles = {
  root: css`
    font-size: 24px;
    color: red;
  `
};

export const ExamplePage = function ({
}: {
}): ReactElement {

  const [issues] = useSuspenseQuery("fetchIssues", window.api.fetchIssues, {});

  console.log(issues);

  return (
    <div className={styles.root}>
      HEY!
    </div>
  );

};