<template>
  <div>
    <PromptList />
  </div>

</template>

<script lang="ts">
  import { defineComponent, onBeforeMount } from 'vue'
  import Tags from './components/composed/Tags.vue'
  import PromptList from './components/composed/PromptList.vue'

  export default defineComponent({
    name: 'App',

    components: {
      PromptList
    }
  })
</script>

<style lang="scss" scoped>

</style>
