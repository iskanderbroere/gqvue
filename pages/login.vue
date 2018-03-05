<template>
  <v-layout justify-center align-center>
    <v-card tile style="flex: 0 1 400px">
      <v-card-title class="headline pb-0">Log In</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-alert v-if="alert" :type="alert.type" value="true">{{ alert.message }}</v-alert>
          <v-text-field
            v-model="email"
            :disabled="loading"
            required
            label="Email"/>
          <v-text-field
            v-model="password"
            :disabled="loading"
            required
            label="Password"
            type="password"/>
          <v-btn 
            :loading="loading"
            :disabled="loading"
            large
            outline
            block
            type="submit">Log In</v-btn>
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
      email: "developer@example.com",
      password: "nooneknows",
      alert: null,
      loading: false
    }
  },
  methods: {
    submit() {
      this.alert = null
      this.loading = true
      this.$apollo
        .mutate({
          mutation: LOGIN,
          variables: {
            email: this.email,
            password: this.password
          }
        })
        .then(res => {
          const { token, user } = res.data.login
          this.loading = false
          this.$store.commit("set_user", { token, name: user.name })
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            this.alert = {
              type: "error",
              message: error.graphQLErrors[0].message || "No error message"
            }
          }
        })
    }
  }
}
</script>
