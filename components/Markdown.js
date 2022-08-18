/*import MarkdownView from 'react-markdown'

export default function ({ text }) {
  return <MarkdownView 
    markdown={text}
    options={{ tables: true, emoji: true, openLinksInNewWindow: true }}
  />
}*/

import { marked } from 'marked'
const renderer = new marked.Renderer();


renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${ href }">${ text }</a>`
}

marked.setOptions({
  renderer: renderer,
  headerIds: true,
  gfm: true
});


export default function ({ text }) {
  return <div dangerouslySetInnerHTML={{
    __html: marked.parse(text)
  }} />;
}