<template>
  <div :class="$style.responseToolContainer">
    <Button withIconOnRight
      type="standard">
      <Icon type="add" />
      Add response
    </Button>
    <span :class="$style.responseCount">
      2 Responses
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Icon, Button } from '../../components/base'

export default defineComponent({
  name: 'PromptResponses',

  components: {
    Button,
    Icon
  }
})
</script>

<style lang="scss" module>
@use '../../styles/components/composed/prompt-tools';
</style>