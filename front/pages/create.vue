<template>
  <v-btn color="primary" @click="create" flat>Create a new container</v-btn>
</template>

<script>
import containersObj from '~/modules/containersModule'
export default {
  methods: {
    async create() {
      this.$nuxt.$loading.start()
      const created = await containersObj.create()
      this.$nuxt.$loading.finish()
      this.$router.push({ path: '/', query: { t: new Date().getTime() } })
    }
  }
}
</script>
