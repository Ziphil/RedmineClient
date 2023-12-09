//

import MarkdownIt from "markdown-it";
import {HtmlString} from "/renderer/type/common";


const markdown = new MarkdownIt({breaks: true});

export function renderMarkdown(string: string): HtmlString {
  return markdown.render(string) as HtmlString;
}