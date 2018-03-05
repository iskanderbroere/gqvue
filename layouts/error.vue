<template>
  <v-app>
    <v-alert
      :value="true" 
      type="error"
      outline >
      {{ error.message }} 
      <v-btn
        large
        outline
        @click="$router.go(-1)">
        Back
      </v-btn>
      <v-btn
        large
        nuxt
        outline
        to="/">
        Home
      </v-btn>
    </v-alert>
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {
          statusCode: 500,
          message: "An error has occurred"
        }
      }
    }
  }
}
</script>
