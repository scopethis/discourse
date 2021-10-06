import { reactive } from 'vue';
import { slugify } from '../../utils/String';

function Tagged($tags?: Array<Tag>, editing?: boolean) {
  const tags = $tags 
    ? JSON.parse(JSON.stringify($tags))
    : []

  const state = reactive({
    tags: tags,
    current: tags,
    input: '',
    editing: editing,
    saved: false,
    cancelled: false,
  })

  function edit() {
    state.editing = true
    state.cancelled = false
  }

  function cancel() {
    state.editing = false
    state.cancelled = true
    state.current = [...state.tags]
  }

  function add ($tag: string) {
    if (state.editing) {
      const slugged = slugify($tag)
      if (!exists(slugged)) {
        const tag: Tag = {
          label: $tag,
          slug: slugged
        }

        const tags: Array<Tag> = [...state.current, ...[tag]]
        state.input = ''
        state.saved = false
        state.current = tags
      }
    }
  }

  function remove($tag: Tag) {
    if (state.editing) {
      const tags = state.current.filter((tag: Tag) => {
        return tag.slug !== $tag.slug
      })

      state.current = tags
    }
  }

  function save() {
    if (state.editing) {
      state.tags = [...state.current]
      state.saved = true
      cancel()
    }
  }

  function find($slug: string) {
    return state.tags.find((tag: Tag) => {
      return tag.slug === $slug
    })
  }

  function exists($slug: string): boolean {
    return find($slug) ? true : false
  }

  function input(content: string) {
    state.input = content
  }

  return {
    state,
    input,
    add,
    save,
    edit,
    cancel,
    remove
  }
}

type Tag = {
  label: string,
  slug: string
}

export {
  Tag,
  Tagged
}