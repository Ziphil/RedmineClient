/* eslint-disable no-useless-computed-key */

import {DOMAttributes, ReactElement} from "react";
import {create} from "/renderer/component/create";
import {HtmlString} from "/renderer/type/common";


export const Markdown = create(
  require("./markdown.scss"), "Markdown",
  function ({
    children,
    className
  }: {
    children: HtmlString,
    className?: string
  }): ReactElement {

    return (
      <div styleName="root" className={className} dangerouslySetInnerHTML={createHtmlObject(children)}/>
    );

  }
);


type HtmlObject = DOMAttributes<any>["dangerouslySetInnerHTML"];

export const createHtmlObject = (html: HtmlString): HtmlObject => {
  const htmlObject = {["__html"]: html};
  return htmlObject;
};