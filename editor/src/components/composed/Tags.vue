<template>
  <div>
    <slot name="tools" 
      :save="save" 
      :edit="edit"
      :cancel="cancel" />

    <TextInputArea singleline
      :id="id"
      :value="state.input"
      :editing="editing"
      @keyup="$e => input($e.target.value)"
      @keyup.enter="$e => add($e.target.value)"
      placeholder="Type & enter for new tag">
    </TextInputArea>

    <div :class="$style.tagList">
      <div v-if="state.editing">
        <Tag v-for="(tag, key) in state.current"
          :key="key"
          :class="$style.tag"
          @click="$e => remove(tag)"
          :slug="tag.slug">
          {{tag.label}}
        </Tag>
      </div>

      <div v-if="!state.editing">
        <Tag v-for="(tag, key) in state.tags"
          :class="$style.tag"
          :key="key"
          :slug="tag.slug">
          {{tag.label}}
        </Tag>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import TextInputArea from '../../components/base/TextInputArea.vue'
import Tag from './Tag.vue'
import {Tagged} from '../../components/traits/tags/Tagged'

export default defineComponent({
  name: 'Tags',

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
        return ''
      }
    },
    action: {
      type: String,
      default: () => {
        return ''
      }
    },
  },

  components: {
    TextInputArea,
    Tag
  },

  setup: (props, context) => {
    const { 
      state, 
      add, 
      remove, 
      input, 
      cancel, 
      edit, 
      save } = Tagged(props.value, props.editing)

    watch(() => state.cancelled, (cancelled, previous) => {
      if (cancelled) {
        context.emit('cancelled', {id: props.id, value: state.tags})
      }
    })

    watch(() => state.saved, (saved, previous) => {
      if (saved) {
        context.emit('saved', {id: props.id, value: state.tags})
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
      add,
      cancel,
      save,
      state,
      remove,
      input,
      edit
    }
  }
})
</script>

<style lang="scss" module>
@use '../../styles/components/composed/prompt-tools';
@use '../../styles/components/composed/tag';
</style>