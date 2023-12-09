//

import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const PageContainer = create(
  require("./page-container.scss"), "PageContainer",
  function ({
    menuNode,
    children
  }: {
    menuNode?: ReactNode,
    children: ReactNode
  }): ReactElement {

    return (
      <main styleName="root">
        <div styleName="menu">
          {menuNode}
        </div>
        <div styleName="main">
          {children}
        </div>
      </main>
    );

  }
);