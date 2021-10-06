<template>
  <div :class="$style.promptList">
    <Button withIconOnLeft
      @click="create()">
      <Icon type="add" />
      Add question / prompt
    </Button>

    <PromptBuilder v-for="prompt in state.prompts"
      @remove="remove"
      :id="prompt.id"
      :key="prompt.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PromptList } from '../../components/traits/promptbuilder/PromptList'
import PromptBuilder from './PromptBuilder.vue'
import Button from '../../components/base/Button.vue'
import Icon from '../../components/base/Icon.vue'

export default defineComponent({
  setup:() => {
     const { state, create, remove } = PromptList()

     return {
       state,
       create,
       remove
     }
  },

  components: {
    PromptBuilder,
    Button,
    Icon
  }
})

</script>

<style lang="scss" module>
@use '../../styles/components/composed/prompt-list';
</style>