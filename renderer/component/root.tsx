//

import {css} from "@linaria/core";
import {Fragment, ReactElement} from "react";
import {ProviderRoot} from "/renderer/component/core/provider-root";
import {Routing} from "/renderer/component/core/routing";
import {gradientBackground, textColor} from "/renderer/util/css";


require("simplebar-react/dist/simplebar.min.css");


const globalStyle = css`
  :global() {
    html {
      font-family: "Commissioner", "Noto Sans JP", sans-serif;
      font-size: 16px;
      font-feature-settings: "palt" 1, "pkna" 1, "lnum" 1, "kern" 1 !important;
      color: ${textColor()};
      margin: 0rem;
      padding: 0rem;
      line-height: 1;
      background-color: transparent;
      text-decoration-skip-ink: none;
    }
    #root {
      border-radius: 12px;
      ${gradientBackground(0.98)}
      overflow: hidden;
    }
    html,
    body,
    #root {
      height: 100%;
      user-select: none;
    }
    *:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
      all: unset;
      display: revert;
      min-block-size: 0rem;
      min-inline-size: 0rem;
      background-origin: border-box;
    }
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
  }
`;

const Root = function ({
}: {
}): ReactElement | null {

  const node = (
    <Fragment>
      <div className={globalStyle}/>
      <ProviderRoot>
        <Routing/>
      </ProviderRoot>
    </Fragment>
  );
  return node;

};


export default Root;