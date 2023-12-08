//

import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const PageContainer = create(
  require("./page-container.scss"), "PageContainer",
  function ({
    children
  }: {
    children: ReactNode
  }): ReactElement {

    return (
      <main styleName="root">
        {children}
      </main>
    );

  }
);