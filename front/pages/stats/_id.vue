<template>
  <v-layout row wrap>
    <h3>Stats</h3>
    <v-flex xs12>
      <pre>{{ containerStats }}</pre>
    </v-flex>
  </v-layout>
</template>
<script>
import containersObj from '~/modules/containersModule'
export default {
  async asyncData({ params }) {
    const container = await containersObj.stats(params.id)
    return {
      containerStats: container.data
    }
  }
}
</script>
