<template>
  <div v-if="editor" class="flex flex-col w-full min-h-half sm:rounded-lg">
    <div
        class="sticky top-0 z-10 flex justify-between text-neutral-500 focus:outline-none
        toolbar pt-4 pb-6 text-2xl"
    >
      <div class="flex flex-wrap items-center space-x-1.5">
        <Icon name="material-symbols:format-h1-rounded" class="btn-icon"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />
        <Icon name="material-symbols:format-h2-rounded" class="btn-icon"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />
        <Icon name="material-symbols:format-h3-rounded" class="btn-icon"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />
        <Icon name="material-symbols:format-bold-rounded" class="btn-icon"
              @click="editor.chain().focus().toggleBold().run()"
        />
        <Icon name="material-symbols:format-italic-rounded" class="btn-icon"
              @click="editor.chain().focus().toggleItalic().run()"
        />
        <Icon name="material-symbols:format-quote-rounded" class="btn-icon"
              @click="editor.chain().focus().toggleBlockquote().run()"
        />
        <Icon name="bx:code-block" class="btn-icon"
              @click="editor.chain().focus().toggleCodeBlock().run()"
        />
        <Icon name="material-symbols:ink-highlighter-outline-rounded" class="btn-icon"
              @click="editor.chain().focus().toggleHighlight().run()"
        />
        <Icon name="material-symbols:format-align-left-rounded" class="btn-icon"
              @click="editor.chain().focus().setTextAlign('left').run()"
        />
        <Icon name="material-symbols:format-align-center-rounded" class="btn-icon"
              @click="editor.chain().focus().setTextAlign('center').run()"
        />
        <Icon name="material-symbols:format-align-right-rounded" class="btn-icon"
              @click="editor.chain().focus().setTextAlign('right').run()"
        />
        <label class="flex items-center">
          <Icon name="mdi:image-add-outline" class="btn-icon"/>
          <input
              @change="uploadImage"
              type="file"
              accept=".jpeg,.jpg,.png,image/jpeg,image/png,image/gif"
              class="sr-only"
          />
        </label>
      </div>
      <div class="flex flex-wrap items-center justify-around space-x-2">
        <Icon name="material-symbols:undo" class="btn-icon"
              @click="editor.chain().focus().undo().run()"
        />
        <Icon name="material-symbols:redo" class="btn-icon"
              @click="editor.chain().focus().redo().run()"
        />
        <div class="text-sm">
          <span class="font-bold text-center text-teal-600">
            {{ editor.storage.characterCount.words() }}
          </span>
          <span> words</span>
        </div>
      </div>
    </div>

    <article class="editor flex-1 w-full h-full overflow-y-auto">
      <editor-content :editor="editor" class="h-full"/>
      <!-- add link -->
      <div
          v-if="showAddLink"
          @keydown.esc="showAddLink = !showAddLink"
          class="absolute top-0 z-10 w-full p-2 pb-4 bg-white border shadow-xl dark:bg-stone-800 border-stone-700 "
          tabindex="0"
      >
        <div class="relative px-2">
          <label class="text-sm text-stone-500"
          >Paste a URL

            <input
                v-model="urlLink"
                v-focus
                type="url"
                class="form-input"
                placeholder="https://www.example.com/"
            />
            <button
                @click="addLink"
                class="absolute px-3 py-1 text-sm font-semibold uppercase bg-white rounded top-1/2 right-5 "
                :class="{ 'is-active': editor.isActive('link') }"
            >
              add
            </button>
          </label>
        </div>
      </div>
    </article>

    <div class="relative">
      <bubble-menu
          class="flex items-center px-2 py-1 space-x-2 bg-white border rounded shadow border-stone-300 dark:border-stone-700 "
          :editor="editor"
          :tippy-options="{ duration: 100 }"
          v-if="editor"
      >
        <Icon name="mdi:link-variant" class="btn-icon"
              @click="addLink"
        />
        <Icon name="bx:code-block" class="btn-icon"
              @click="editor.chain().focus().toggleCode().run()"
        />
      </bubble-menu>
    </div>
  </div>
</template>

<script setup>
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";
import {BubbleMenu, EditorContent, useEditor} from "@tiptap/vue-3";
import {WordCount} from "@/components/editor/utils";
import {Markdown} from '@hasbai/tiptap-markdown';
import {Typography} from "@tiptap/extension-typography";
import {Mathematics} from "@tiptap-pro/extension-mathematics";
import 'katex/dist/katex.min.css'

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const showAddYTLink = ref("");
const showAddLink = ref("");
const ytLink = ref("");
const urlLink = ref("");

const vFocus = {
  mounted: (el) => el.focus(),
};

const editor = useEditor({
  extensions: [
    StarterKit,
    Markdown,
    Image,
    Link.configure({openOnClick: false}),
    TextAlign.configure({types: ["heading", "paragraph"]}),
    Highlight,
    Typography,
    WordCount,
    Youtube,
    Mathematics,
    Placeholder.configure({
      emptyEditorClass: "is-editor-empty",
      placeholder: ({node}) => {
        return "Write something …";
      },
    }),
  ],
  editorProps: {
    attributes: {
      class:
          "prose focus:outline-none dark:bg-stone-800",
    },
  },
  content: props.modelValue,
  autofocus: true,
  onUpdate: ({editor}) => {
    emit("update:modelValue", editor.storage.markdown.getMarkdown())
  },
});

const readData = (f) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(f);
  });
};

const uploadImage = async (event) => {
  let file = event.target.files[0];
  // editor.value.chain().focus().setImage({src: res.secure_url}).run();
};

// add YouTube video
const addVideo = (url) => {
  if (ytLink.value) {
    editor.value.commands.setYoutubeVideo({
      src: ytLink.value,
    });
    ytLink.value = "";
    showAddYTLink.value = false;
  }
};

// add URL video
const addLink = (url) => {
  const previousUrl = editor.value.getAttributes("link").href;
  // console.log(previousUrl)

  if (previousUrl) {
    editor.value.commands.unsetLink({
      href: urlLink.value,
    });
    return;
  }

  showAddLink.value = !showAddLink.value;

  if (urlLink.value) {
    editor.value.commands.setLink({
      href: urlLink.value,
    });
    urlLink.value = "";
    showAddLink.value = false;
  }
};
</script>

<style>
.ProseMirror {
  min-height: 50vh;
}

.Tiptap-mathematics-editor {
  font-family: var(--font-mono);
  padding: 0.25rem;
}

.Tiptap-mathematics-render {
  padding: 0 0.25rem;

  &--editable {
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #eee;
    }
  }
}

.Tiptap-mathematics-editor,
.Tiptap-mathematics-render {
  border-radius: 0.25rem;
  display: inline-block;
}

.toolbar {
  background: var(--background);
}

.editor::-webkit-scrollbar {
  width: 6px;
}

.editor::-webkit-scrollbar-track {
  background: #f3f3f3;
  border-radius: 2px;
}

.editor::-webkit-scrollbar-thumb {
  background: rgb(210, 210, 210);
  border-radius: 8px;
}

.editor::-webkit-scrollbar-thumb:hover {
  background: rgb(180, 180, 180);
}

.editor::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>