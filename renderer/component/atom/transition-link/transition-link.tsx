/* eslint-disable no-useless-computed-key */

import {AnchorHTMLAttributes, ReactElement} from "react";
import {Link, Path} from "react-router-dom";
import {create} from "/renderer/component/create";


export const TransitionLink = create(
  require("./transition-link.scss"), "TransitionLink",
  function ({
    to,
    children,
    ...data
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string | Partial<Path>
  }): ReactElement {

    const props = {["unstable_viewTransition"]: true};

    return (
      <Link to={to} styleName="root" {...props} {...data}>
        {children}
      </Link>
    );

  }
);