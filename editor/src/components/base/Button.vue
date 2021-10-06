<template>
  <button 
    @click="click"
    :class="styles">
      <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',

  props: {
    type: {
      type: String,
      default: () => {
        return 'button';
      }
    },
    theme: {
      type: String,
      default: () => {
        return 'default';
      }
    },
    role: {
      type: String,
      default: () => {
        return 'default';
      }
    },
    selected: {
      type: Boolean,
      default: () => {
        return false;
      }
    },

    withIconOnLeft: {
      type: Boolean,
      default: () => {
        return false;
      }
    },

    withIconOnRight: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },

  computed: {
    styles() {
      let style = [
        this.$style[this.type],
        this.theme,
        this.role
      ];

      switch(this.selected) {
        case true:
          style.push(`on`);
          break;
        case false:
          style.push(`off`);
          break;
        default:
          break
      }

      if(this.withIconOnRight) {
        style.push('iconOnRight')
      }

      if(this.withIconOnLeft) {
        style.push('iconOnLeft')
      }

      return style
    }
  }
})
</script>

<style lang="scss" module>
@use '../../styles/components/base/button/button';
</style>