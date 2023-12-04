//

import {
  css
} from "@linaria/core";
import {
  Fragment,
  ReactElement,
  Suspense
} from "react";
import {
  ErrorBoundary
} from "react-error-boundary";
import {
  QueryClientProvider
} from "react-query";
import {
  ChartPage
} from "/renderer/component/page/chart-page";
import {
  queryClient
} from "/renderer/hook/request";


const globalStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Commissioner:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=Noto+Sans:wght@400;700&display=swap");
  :global() {
    html {
      font-family: "Commissioner", "Noto Sans JP", "Dubai", "Noto Sans", sans-serif;
      font-size: 16px;
      font-feature-settings: "palt" 1, "pkna" 1, "lnum" 1, "kern" 1 !important;
      color: hsl(0, 0%, 10%);
      margin: 0rem;
      padding: 0rem;
      line-height: 1;
      text-decoration-skip-ink: none;
    }
    html,
    body {
      height: 100%;
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