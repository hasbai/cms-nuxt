// ProseMirror-markdown will auto escape some characters, so we need to unescape it.
import CharacterCount from "@tiptap/extension-character-count";

export const unescape = (markdown: string) => {
  return markdown.replace(/\\([`*\\~\[\]_])/g, '$1')
}

export const WordCount = CharacterCount.extend({
  onBeforeCreate() {
    this.storage.characters = options => {
      // use words only, for better performance
      return 0
    }

    this.storage.words = options => {
      const node = options?.node || this.editor.state.doc
      const text = node.textBetween(0, node.content.size, ' ', ' ')
      const cn = text.match(/\p{sc=Han}/gu) || '';
      const en = text.replace(/[^\w-]/g, ' ').split(/\s+/).filter(w => {
        return ['', '-', '_'].indexOf(w.trim()) === -1
      })
      return cn.length + en.length
    }
  },
});