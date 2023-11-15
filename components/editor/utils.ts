// ProseMirror-markdown will auto escape some characters, so we need to unescape it.
export const unescape = (markdown: string) => {
  return markdown.replace(/\\([`*\\~\[\]_])/g, '$1')
}