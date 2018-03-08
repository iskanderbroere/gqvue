<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <div>
            <span class="grey--text">{{ user.name }}</span><br>
            <span>{{ user.email }}</span><br>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from "vuex"

export default {
  computed: mapState({
    user: "user"
  })
}
</script>
