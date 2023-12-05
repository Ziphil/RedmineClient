//

import {css} from "@linaria/core";
import {
  Fragment,
  ReactElement,
  Suspense
} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {QueryClientProvider} from "react-query";
import {ChartPage} from "/renderer/component/page/chart-page";
import {queryClient} from "/renderer/hook/request";
import {gradientBackground, textColor} from "/renderer/util/css";


require("simplebar-react/dist/simplebar.min.css");


const globalStyle = css`
  :global() {
    html {
      font-family: "Nunito", "Zen Maru Gothic", "M PLUS Rounded 1c", sans-serif;
      font-size: 16px;
      font-feature-settings: "palt" 1, "pkna" 1, "lnum" 1, "kern" 1 !important;
      color: ${textColor()};
      margin: 0rem;
      padding: 0rem;
      line-height: 1;
      ${gradientBackground(0.98)}
      text-decoration-skip-ink: none;
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
      <ErrorBoundary fallbackRender={() => <div>Please Reload</div>}>
        <Suspense fallback={<div/>}>
          <QueryClientProvider client={queryClient}>
            <ChartPage/>
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  );
  return node;

};


export default Root;