/* eslint-disable no-useless-computed-key */

import {css} from "@linaria/core";
import {DOMAttributes, ReactElement} from "react";


const styles = {
  root: css`
  `
};

export const Markdown = function ({
  children
}: {
  children: string
}): ReactElement {

  return (
    <div className={styles.root} dangerouslySetInnerHTML={createHtmlObject(children)}/>
  );

};


type HtmlObject = DOMAttributes<any>["dangerouslySetInnerHTML"];

export const createHtmlObject = (html: string): HtmlObject => {
  const htmlObject = {["__html"]: html};
  return htmlObject;
};