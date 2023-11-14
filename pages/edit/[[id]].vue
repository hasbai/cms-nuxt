<template>
  <div class="drawer drawer-end relative">
    <input id="editor-drawer" type="checkbox" class="drawer-toggle"/>
    <label for="editor-drawer"
           class="drawer-button fix z-10 btn btn-lg btn-circle btn-primary">
      <Icon name="fa:send" size="1.5rem"/>
    </label>
    <main class="drawer-content pb-96">
      <h1 class="h1 text-center">{{ content.title }}</h1>
      <div
          v-show="false"
          class="flex flex-wrap items-end justify-end px-2 mt-4 space-x-4 text-xs md:mt-2 "
      >
        <div v-if="content.updated_at" class="p-2 dark:text-stone-600">
          <div class="text-xs capitalize">last updated</div>
          <div class="font-bold">
            {{ content.updated_at }}
          </div>
        </div>
        <div
            class="p-2 bg-white border rounded border-stone-400 dark:bg-stone-700 dark:text-stone-500 "
        >
          <div class="text-xs capitalize">created</div>
          <div class="font-bold">{{ content.created_at }}</div>
        </div>
      </div>
      <TipTap v-model="content.text" class=""/>
    </main>
    <div class="drawer-side z-50">
      <label for="editor-drawer" class="drawer-overlay"></label>
      <div
          class="menu form-control p-4 w-80 h-full flex flex-col space-y-4 bg-base-200 text-base-content">
        <div>
          <label class="label">Title</label>
          <input type="text" v-model="content.title" class="input w-full"/>
        </div>
        <div>
          <label class="label">Description</label>
          <textarea v-model="content.description" class="textarea w-full"/>
        </div>
        <div>
          <label class="label">Author</label>
          <AuthorInput v-model="content.authors"/>
        </div>
        <div>
          <label class="label">Created At</label>
          <input type="datetime-local" v-model="content.created_at" class="input w-full"/>
        </div>
        <div>
          <label class="label">Tags</label>
          <TagInput v-model="content.tags"/>
        </div>
        <label class="label cursor-pointer">
          <span class="label-text">Public</span>
          <input type="checkbox" class="toggle toggle-primary" v-model="content.is_public"/>
        </label>
        <span></span>
        <button @click="updateDoc" class="btn btn-success">Post</button>
        <button @click="deleteDoc" class="btn btn-error">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {$myFetch, getSingle, myFetch, returnSingle} from "@/composables/myFetch";
import {Content, Tag} from "@/models";
import AuthorInput from "@/components/AuthorInput.vue";

const route = useRoute();
let content = reactive(new Content())
if (route.params.id) {
  const {data} = await myFetch<Content>(`/contents`, {
    headers: getSingle,
    query: {
      id: `eq.${route.params.id}`,
      select: '*,tags(*),authors(*)'
    }
  })
  Object.assign(content, data.value)
}

definePageMeta({
  name: "edit",
});

useHead({
  title: `Edit ${content.title}`,
  meta: [
    {
      name: "description",
      content: content.description,
    },
  ],
})

const router = useRouter()
const isNew = !route.params.id
const originalTags: Tag[] = Object.assign([], content.tags)
const updateDoc = async () => {
  let id = content.id
  const tags = content.tags || []
  delete content.id
  delete content.tags
  if (content.authors) content.author_id = content.authors.id
  delete content.authors
  // upsert content
  if (isNew) {
    const data = await $myFetch<Content>(`/contents`, {
      method: "POST",
      body: JSON.stringify(content),
      headers: returnSingle
    })
    id = data.id
  } else {
    await $myFetch(`/contents?id=eq.${route.params.id}`, {
      method: "PATCH",
      body: JSON.stringify(content),
    })
  }
  // update relations
  const a = originalTags.map((tag) => tag.id)
  const b = tags.map((tag) => tag.id)
  if (a.length !== b.length ||
      !a.every((element, index) => element === b[index])) {
    if (a.length > 0) {
      await $myFetch('/content_tags', {
        method: 'DELETE',
        query: {content_id: `eq.${id}`}
      })
    }
    if (b.length > 0) {
      await $myFetch('/content_tags', {
        method: 'POST',
        body: JSON.stringify(tags.map((tag) => {
          return {
            content_id: id,
            tag_id: tag.id
          }
        }))
      })
    }
  }
  // router push
  if (isNew) {
    await router.push(`/`)
  } else {
    await router.push(`/contents/${route.params.id}`)
  }
};

const deleteDoc = async () => {
  await $myFetch(`/contents?id=eq.${route.params.id}`, {
    method: "DELETE"
  })
  await router.push(`/`)
};

</script>

<style>

</style>