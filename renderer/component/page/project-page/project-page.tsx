//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Page} from "/renderer/component/module/page";


export const ProjectPage = create(
  require("./project-page.scss"), "ProjectPage",
  function ({
  }: {
  }): ReactElement {

    return (
      <Page>
        {null}
      </Page>
    );

  }
);