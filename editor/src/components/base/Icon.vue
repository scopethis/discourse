<template>
  <i :class="styles">{{type}}</i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',

  props: {
    type: {
      type: String,
      default: () => {
        return '';
      }
    },
    foundry: {
      type: String,
      default: () => {
        return 'material';
      }
    }
  },

  computed: {
    styles() {
      let style = [
        this.$style['icon'],
        this.foundry
       ];
     return style
    }
  }
})
</script>

<style lang="scss" module>
@use '../../styles/components/base/icons/icons';
</style>