<template>
  <h3>{{ container.Name.split('/')[1] }}</h3>
</template>

<script>
import containersObj from '~/modules/containersModule'
export default {
  async asyncData({ error, query, params }) {
    const instance = await containersObj.get(params.id)
    return {
      container: instance.data
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.container)
  }
}
</script>

