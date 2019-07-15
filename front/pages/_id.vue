<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <h3>Actions</h3>
        <v-btn color="success" @click="logs" flat>Logs</v-btn>
        <v-btn color="primary" @click="stats" flat>Stats</v-btn>
        <v-btn v-if="container.State.Running" color="warning" @click="stop" flat>Stop</v-btn>
        <v-btn v-else color="info" @click="start" flat>start</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <h3>{{ container.Name.split('/')[1] }}</h3>
        <ul>
          <li
            v-for="(key, index) in Object.keys(container)"
            :key="index"
          >{{ key }}: {{ container[`${key}`] }}</li>
        </ul>
      </v-flex>
    </v-layout>
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
  methods: {
    async stop() {
      this.$nuxt.$loading.start()
      const created = await containersObj.stop(this.$route.params.id)
      this.$nuxt.$loading.finish()
      this.$router.push({ path: '/', query: { t: new Date().getTime() } })
    },
    async start() {
      this.$nuxt.$loading.start()
      const created = await containersObj.stop(this.$route.params.id)
      this.$nuxt.$loading.finish()
      this.$router.push({ path: '/', query: { t: new Date().getTime() } })
    },
    async logs() {
      this.$router.push({
        path: `/logs/${this.$route.params.id}`,
        query: { t: new Date().getTime() }
      })
    },
    async stats() {
      this.$router.push({
        path: `/stats/${this.$route.params.id}`,
        query: { t: new Date().getTime() }
      })
    }
  }
}
</script>

