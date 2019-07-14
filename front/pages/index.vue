<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h3>Running containers</h3>
    </v-flex>
    <v-flex xs3 sm3 md3 v-for="item in runningContainers" :key="item.Id">
      <v-card>
        <v-card-title class="headline">{{ item.names[0].split('/')[1] }}</v-card-title>
        <v-card-text>
          <p>Container buttons</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" flat>Stop</v-btn>
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
  components: {
    Logo,
    VuetifyLogo
  },
  async asyncData() {
    const runningContainers = await containersObj.get()
    return {
      runningContainers: runningContainers.data
    }
  },
  mounted() {
    console.log(this.runningContainers)
  }
}
</script>
