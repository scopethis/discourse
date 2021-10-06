import { reactive } from 'vue';

function Editable(content: EditableData) {

  if (content.id === '') {
    throw new Error("Editable content must have an id");
  }

  const state = reactive({
    id: content.id,
    value: content.value,
    current: content.value,
    editing: content.editing || false,
    saved: false,
    cancelled: false,
    history: []
  })

  function edit() {
    state.editing = true
    state.cancelled = false
  }

  function cancel() {
    state.editing = false
    state.cancelled = true
    state.current = state.value
  }

  function change(value: String | Boolean) {
    if (state.editing) {
      state.saved = false
      state.current = value 
    }
  }

  function save() {
    if (state.editing) {
      state.value = state.current
      state.saved = true
      cancel()
    }
  }

  return {
    state,
    edit,
    cancel,
    save,
    change
  }
}

type EditableData = {
  id: String,
  value: String | Boolean,
  editing?: Boolean
}

export {
  Editable,
  EditableData
}