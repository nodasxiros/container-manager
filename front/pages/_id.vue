<template>
  <div>
    <h3>{{ container.Name.split('/')[1] }}</h3>
    <ul>
      <li
        v-for="(key, index) in Object.keys(container)"
        :key="index"
      >{{ key }}: {{ container[`${key}`] }}</li>
    </ul>
  </div>
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
    // console.log(this.container)
  }
}
</script>

