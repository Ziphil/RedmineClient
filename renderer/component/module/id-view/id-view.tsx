//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";


export const IdView = create(
  require("./id-view.scss"), "IdView",
  function ({
    id,
    environment = "light"
  }: {
    id: number,
    environment?: "light" | "dark"
  }): ReactElement {

    return (
      <span styleName="root" {...data({environment})}>
        {id}
      </span>
    );

  }
);
