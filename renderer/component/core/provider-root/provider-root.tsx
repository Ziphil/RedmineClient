//

import {ReactElement, ReactNode, Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {QueryClientProvider} from "react-query";
import {queryClient} from "/renderer/hook/request";


export const ProviderRoot = function ({
  children
}: {
  children?: ReactNode
}): ReactElement | null {

  return (
    <ErrorBoundary fallbackRender={() => <div>Please Reload</div>}>
      <Suspense fallback={<div/>}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );

};