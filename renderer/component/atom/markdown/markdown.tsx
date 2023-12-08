/* eslint-disable no-useless-computed-key */

import {css} from "@linaria/core";
import {DOMAttributes, ReactElement} from "react";
import {borderColor, gradientBackground} from "/renderer/util/css";


const styles = {
  root: css`
    row-gap: 6px;
    font-size: 16px;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 24px;
      &:not(:first-child) {
        margin-block-start: 6px;
      }
    }
    h2 {
      font-size: 20px;
      &:not(:first-child) {
        margin-block-start: 6px;
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
      font-size: 90%;
      border-radius: 2px;
      line-height: 1 !important;
      letter-spacing: -0.05em;
      white-space: pre;
      ${gradientBackground(0.96)}
    }
    blockquote {
      margin-inline-start: 2px;
      padding-inline-start: 8px;
      row-gap: 0.3em;
      display: flex;
      flex-direction: column;
      border-inline-start: 3px double ${borderColor()};
    }
    ul {
      list-style: none;
      >li {
        margin-inline-start: 12px;
        position: relative;
        &::before {
          inset-inline-start: -12px;
          position: absolute;
          content: "•";
        }
      }
    }
    ol {
      list-style: none;
      counter-reset: list;
      >li {
        margin-inline-start: 24px;
        position: relative;
        counter-increment: list;
        &::before {
          width: 18px;
          padding-block: 0.2em;
          inset-inline-start: -24px;
          inset-block-end: 0.24em;
          font-size: 70%;
          letter-spacing: -0.05em;
          border-radius: 1em;
          line-height: 1;
          border: 1px solid currentcolor;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          content: counter(list);
        }
      }
    }
    pre {
      padding-block: 6px;
      padding-inline: 6px;
      border-radius: 4px;
      line-height: 1 !important;
      ${gradientBackground(0.96)}
      code {
        display: contents;
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