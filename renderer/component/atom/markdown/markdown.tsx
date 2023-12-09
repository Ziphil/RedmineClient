/* eslint-disable no-useless-computed-key */

import {DOMAttributes, ReactElement} from "react";
import {create} from "/renderer/component/create";


export const Markdown = create(
  require("./markdown.scss"), "Markdown",
  function ({
    children
  }: {
    children: string
  }): ReactElement {

    return (
      <div styleName="root" dangerouslySetInnerHTML={createHtmlObject(children)}/>
    );

  }
);


type HtmlObject = DOMAttributes<any>["dangerouslySetInnerHTML"];

export const createHtmlObject = (html: string): HtmlObject => {
  const htmlObject = {["__html"]: html};
  return htmlObject;
};