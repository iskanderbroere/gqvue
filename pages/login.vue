<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <v-card-title class="headline">Log In</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-alert v-if="alert" :type="alert.type" value="true">{{ alert.message }}</v-alert>
          <v-text-field v-model="email" label="Email" />
          <v-text-field v-model="password" label="Password" type="password"/>
          <v-btn :loading="loading" :disabled="loading" type="submit">Log In</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import LOGIN from "~/apollo/mutations/login"

export default {
  layout: "fullscreen",
  data() {
    return {
      email: "",
      password: "",
      alert: null,
      loading: false
    }
  },
  methods: {
    submit() {
      const meail = this.email
      const pw = this.password
      this.email = ""
      this.password = ""
      this.alert = null
      this.loading = true
      this.$apollo
        .mutate({
          mutation: LOGIN,
          // Parameters
          variables: {
            email: meail,
            password: pw
          }
        })
        .then(data => {
          // Result
          this.loading = false
          console.log(data)
        })
        .catch(error => {
          this.loading = false
          if (error.graphQLErrors.length > 0) {
            this.alert = {
              type: "error",
              message: error.graphQLErrors[0].message || "No error message"
            }
          }
          console.error(error)
          this.email = meail
          this.password = pw
        })
    }
  }
}
</script>
