import { reactive } from 'vue';
import { Tag } from '../tags/Tagged'

function PromptBuilder($prompt: Prompt) {
  if (!$prompt) {
    throw new Error('Please supply a prompt to the builder')
  }
  if (!$prompt.id) {
    throw new Error('No id property found. Please add one')
  }

  const prompt:Prompt = JSON.parse(JSON.stringify($prompt))

  const state = reactive({
    view: 'none',
    id: prompt.id,
    text: prompt.text,
    tags: prompt.tags,
    action: ''
  })

  const editing: Editing = reactive({
    all: false,
    text: false,
    tag: false,
    none: false
  })

  function editNone() {
    editing.text = false
    editing.tag = false
    editing.all = false
  }

  function update(type: string, content: string|Array<Tag>) {
    switch (type) {
      case 'text':
        setText(content as string)
        break;
      case 'tag':
        setTags(content as Array<Tag>)
        break;
    }
    setView('none')
    setAction('')
  }

  function setText(text: string) {
    state.text = text
  }

  function setTags(tags: Array<Tag>) {
    state.tags = tags
  }

  function setView(view: string) {
    editNone()
    state.view = view
    editing[view] = true
  }

  function setAction(action: string) {
    state.action = action
    if (action === "cancel") {
      setView('none')
    }
  }

  return {
    editing,
    state,
    setView,
    setAction,
    update
  }
}

type Editing = {
  [key: string]:  boolean
}

type Prompt = {
  id: string,
  text?: string,
  tags?: Array<Tag>
}

export {
  PromptBuilder,
  Prompt
}