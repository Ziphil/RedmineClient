//

import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const SingleLineText = create(
  require("./single-line-text.scss"), "SingleLineText",
  function ({
    tag = "div",
    children,
    className,
    ...data
  }: {
    tag?: string,
    children?: ReactNode,
    className?: string
  }): ReactElement {

    const Tag = tag as any;

    return (
      <Tag styleName="root" className={className} {...data}>
        <span styleName="inner">
          {children}
        </span>
      </Tag>
    );

  }
);