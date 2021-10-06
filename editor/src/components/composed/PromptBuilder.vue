<template>
  <div :class="styles">

    <div :class="$style.content">
      <TextInputArea
        placeholder="Write a prompt"
        :class="$style.prompt"
        :id="state.id"
        :value="state.text"
        :editing="editing.all"
        :action="state.action"
        @saved="($e) => update('text', $e.value)">
      </TextInputArea>

      <Tags
        :class="$style.tags"
        :id="state.id"
        :value="state.tags"
        :editing="editing.all"
        :action="state.action"
        @saved="($e) => update('tag', $e.value)">
      </Tags>

      <div
        v-show="state.view === 'remove'">
        <p>Are you sure you want to remove this prompt</p>
        <Button withIconOnLeft
          @click="setView('none')">
          <Icon type="clear" />
          Cancel
        </Button>
        <Button withIconOnLeft
          @click="remove()">
          <Icon type="clear" />
          Remove
        </Button>
      </div>
    </div>

    <PromptTools
      :class="$style.tools"
      @select="setView"
      @action="setAction"
      :current="state.view" />

    <!--
    <PromptResponses
      :class="$style.responseTools" />
      -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PromptBuilder, Prompt } from '../../components/traits/promptbuilder/PromptBuilder'
import { Icon, Button, TextInputArea } from '../../components/base'
import { Tags, PromptTools, PromptResponses } from './'

export default defineComponent({
  name: 'PromptBuilder',

  components: {
    PromptTools,
    PromptResponses,
    TextInputArea,
    Tags,
    Button,
    Icon,
  },

  setup:(props, context) => {
    const prompt:Prompt = {
      id: props.id,
      text: ''
    }

    const action = ref("")
    const {editing, state, setView, setAction, update} = PromptBuilder(prompt)

    function remove() {
      context.emit('remove', {id: props.id})
    }

    return {
      state,
      editing,
      setView,
      update,
      remove,
      setAction
    }
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    styles() {
      let style = [this.$style.promptBuilder]
      return style
    }
  }
})

</script>

<style lang="scss" module>
@use '../../styles/components/composed/prompt-tools';
@use '../../styles/components/composed/prompt-builder';
</style>