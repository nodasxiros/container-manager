<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h3 v-if="runningContainers.length">Running containers</h3>
    </v-flex>
    <v-flex xs3 sm3 md3 v-for="item in runningContainers" :key="item.Id">
      <v-card>
        <v-card-title class="headline">{{ item.Names[0].split('/')[1] }}</v-card-title>
        <v-card-text>
          <small>Image: {{ item.Image }}</small>
          <p>{{ new Date(item.Created)}}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt :to="`/${item.Id}`" flat>Details</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { apiUrl } from '~/modules/settings'
import containersObj from '~/modules/containersModule'

export default {
  head: {
    title: 'Container Manager'
  },
  watchQuery: ['t'],
  components: {
    Logo,
    VuetifyLogo
  },
  async asyncData({ error, query, params }) {
    try {
      const runningContainers = await containersObj.get()
      return {
        runningContainers: runningContainers.data
      }
    } catch (error) {
      error({ statusCode: 404, message: error.message })
    }
  }
}
</script>
