<template>
  <div :class="$style.toolContainer">
    <div v-if="current === 'none'"
      :class="$style.promptTools">
        <Button withIconOnRight
          type="standard"
          theme="white"
          role="primary">
          <Icon type="add" />
          Add response
        </Button>
        <Button 
          type="tool"
          theme="default"
          @click="() => all()">
          <Icon type="create"/>
        </Button>

        <Button
          type="tool"
          theme="default"
          @click="() => remove()">
          <Icon type="remove_circle_outline"/>
        </Button>
    </div>

    <div v-if="current === 'all'"
      :class="$style.promptTools">
        <Button 
          type="tool"
          theme="positive"
          @click="() => save()">
          <Icon type="check"/>
        </Button>

        <Button
          type="tool"
          theme="negative"
          @click="() => cancel()">
          <Icon type="keyboard_return"/>
        </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import Button from '../base/Button.vue'
import Icon from '../base/Icon.vue'
import {Tabbed, List} from '../traits/tabbed/Tabbed.ts'

export default defineComponent({
  name: 'PromptTools',

  components: {
    Button,
    Icon
  },

  props: {
    current: {
      type: String,
      default: () => {
        return ''
      }
    }
  },

  setup: (props, context) => {

    function save() {
       context.emit('action', 'save')
    }

    function cancel() {
       context.emit('action', 'cancel')
    }

    function all() {
       context.emit('select', 'all')
    }

    function remove() {
      context.emit('select', 'remove')
    }

    return {
      all,
      remove,
      save,
      cancel
    }
  }
})
</script>

<style lang="scss" module>
@use '../../styles/components/composed/prompt-tools';
</style>