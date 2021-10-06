import { reactive } from 'vue';
import { uuidv4 } from '../../utils/UUID'
import { Prompt } from './PromptBuilder'

function PromptList($prompts: PromptsList) {
  const prompts = JSON.parse(JSON.stringify($prompts || []))

  const state = reactive({
    prompts
  })

  function create() {
    const prompt: Prompt = {
      id: uuidv4(),
      tags: []
    }
    state.prompts = [...state.prompts, ...[prompt]]
  }

  function remove($event: RemoveEvent) {
    const prompts = state.prompts.filter((prompt: Prompt) => {
      return prompt.id !== $event.id
    })

    state.prompts = [...prompts]
  }

  return {
    state,
    create,
    remove
  }
}

type RemoveEvent = {
  id: string
}

type PromptsList = {
  prompts: Array<Prompt>
}

export {
  PromptList
}