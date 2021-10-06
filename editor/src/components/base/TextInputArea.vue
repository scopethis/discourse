<template>
  <div>
    <slot name="tools" 
      :save="save" 
      :edit="edit"
      :cancel="cancel" />

    <div :class="containerStyle">

      <textarea
        :placeholder="placeholder"
        v-if="!state.editing"
        :class="styles"
        rows="1"
        v-model="state.value" />


      <textarea
        oninput="this.parentNode.dataset.value = this.value"
        :placeholder="placeholder"
        rows="1"
        v-if="state.editing"
        :class="styles"
        @keyup="$e => change($e.target.value)"
        v-model="state.current" />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { Editable, EditableData } from '../traits/editable/Editable'

export default defineComponent({
  name: 'TextInputArea',

  props:{
    theme: {
      type: String,
      default: () => {
        return 'default';
      }
    },
    editing: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: () => {
        return 'me'
      }
    },
    action: {
      type: String,
      default: () => {
        return ''
      }
    },
    singleline: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return ''
      }
    }
  },

  setup:(props, context) => {
    const content: EditableData = {
      id: props.id,
      value: props.value,
      editing: props.editing
    }

    const { state, change, save, cancel, edit } = Editable(content)

    watch(() => props.value, (value, previous) => {
      change(value)
    })

    watch(() => state.cancelled, (cancelled, previous) => {
      if (cancelled) {
        context.emit('cancelled', {id: props.id, value: state.value})
      }
    })

    watch(() => state.saved, (saved, previous) => {
      if (saved) {
        context.emit('saved', {id: props.id, value: state.value})
      }
    })

    watch(() => props.editing, (isEditing, previous) => {
      if(isEditing) edit()
      if(!isEditing) cancel()
    })

    watch(() => props.action, (action, previous) => {
      if(action === "save") save()
      if(action === "cancel") cancel()
    })

    return {
      state,
      change,
      save,
      edit,
      cancel
    }
  },

  computed: {
    rows(){
      return this.singleline ? 1 : 3
    },
    containerStyle() {
      let style = [
        this.$style['textWrapper']
       ];
       if (this.state.editing) {
         style.push('editing')
       }
       return style
    },

    styles() {
      let style = [
        this.$style['textarea'],
        this.theme
       ];
       if (this.state.editing) {
         style.push('editing')
       }
       if (this.singleline) {
         style.push('singleline')
       }
      return style
    }
  }
})

</script>

<style lang="scss" module>
@use '../../styles/components/base/text/text';
</style>
