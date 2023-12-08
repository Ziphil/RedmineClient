//

import {ReactElement} from "react";
import {ProviderRoot} from "/renderer/component/core/provider-root";
import {Routing} from "/renderer/component/core/routing";
import {create} from "/renderer/component/create";


require("simplebar-react/dist/simplebar.min.css");


const Root = create(
  require("./root.scss"), "Root",
  function ({
  }: {
  }): ReactElement | null {

    const node = (
      <ProviderRoot>
        <Routing/>
      </ProviderRoot>
    );
    return node;

  }
);


export default Root;