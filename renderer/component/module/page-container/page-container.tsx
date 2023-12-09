//

import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";
import {Header} from "/renderer/component/module/header";
import {WorkPlayer} from "/renderer/component/module/work-player";


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
      <div styleName="root">
        <div styleName="top">
          <Header/>
          <WorkPlayer/>
        </div>
        <main styleName="main">
          <div styleName="pane">
            {children}
          </div>
        </main>
      </div>
    );

  }
);