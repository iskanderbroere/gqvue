<template>
  <v-app>
    <v-alert       
      :value="true" 
      type="error"
      outline >
      {{ error.message }} 
      <v-btn
        large
        nuxt
        to="/"
        outline>
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
      default: () => {}
    }
  }
}
</script>
