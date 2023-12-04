//


import {
  ReactElement,
  Suspense
} from "react";
import {
  ErrorBoundary
} from "react-error-boundary";
import {
  QueryClientProvider
} from "react-query";
import ExamplePage from "/renderer/component/page/example-page";
import {
  queryClient
} from "/renderer/hook/request";


const Root = function ({
}: {
}): ReactElement | null {

  const node = (
    <ErrorBoundary fallbackRender={() => <div>Please Reload</div>}>
      <Suspense fallback={<div/>}>
        <QueryClientProvider client={queryClient}>
          <ExamplePage/>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
  return node;

};


export default Root;