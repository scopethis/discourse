<template>
  <Button withIconOnRight type="tag">
    <Icon type="clear" />
    <slot />
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../../components/base/Button.vue'
import Icon from '../../components/base/Icon.vue'
export default defineComponent({
  name: 'Tag',

  components: {
    Button,
    Icon
  }
})
</script>

<style lang="scss" module>
@use '../../styles/components/composed/tag';
</style>