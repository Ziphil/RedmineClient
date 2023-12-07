/* eslint-disable no-useless-computed-key */

import {css} from "@linaria/core";
import {DOMAttributes, ReactElement} from "react";
import {gradientBackground} from "/renderer/util/css";


const styles = {
  root: css`
    row-gap: 0.3em;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 150%;
      &:not(:first-child) {
        margin-block-start: 0.3em;
      }
    }
    h2 {
      font-size: 120%;
      &:not(:first-child) {
        margin-block-start: 0.3em;
      }
    }
    strong,
    em {
      text-decoration: underline;
    }
    s {
      text-decoration: line-through;
    }
    code {
      padding-block: 0.1em;
      padding-inline: 0.2em;
      font-family: "Courier Prime", "Noto Sans JP", monospace;
      font-feature-settings: "palt" 0, "pkna" 0 !important;
      font-size: 85%;
      border-radius: 0.2em;
      line-height: 1;
      letter-spacing: -0.05em;
      white-space: pre;
      ${gradientBackground(0.96)}
    }
    blockquote {
      row-gap: 0.3em;
      display: flex;
      flex-direction: column;
    }
    pre {
      padding-block: 0.2em;
      padding-inline: 0.5em;
      border-radius: 0.3em;
      ${gradientBackground(0.96)}
      code {
        padding-block: 0em;
        padding-inline: 0em;
      }
    }
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