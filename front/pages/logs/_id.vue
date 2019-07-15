<template>
  <v-layout row wrap>
    <h3>Logs</h3>
    <v-flex xs12>
      <pre>{{ containerLogs }}</pre>
    </v-flex>
  </v-layout>
</template>
<script>
import containersObj from '~/modules/containersModule'
export default {
  async asyncData({ params }) {
    const container = await containersObj.logs(params.id)
    return {
      containerLogs: container.data
    }
  }
}
</script>
