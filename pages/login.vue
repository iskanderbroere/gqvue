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
          <v-btn
            nuxt
            large
            outline
            block
            @click="$router.go(-1)">
            Back
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import cookies from "js-cookie"
import login from "~/apollo/mutations/login"

export default {
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
      if (cookies.get("bonas-access-token")) {
        this.$store.dispatch("fetch")
        this.loading = false
        this.$router.push("/drafts")
      } else {
        this.$apollo
          .mutate({
            mutation: login,
            variables: {
              email: this.email,
              password: this.password
            }
          })
          .then(res => {
            const { token, user } = res.data.login
            cookies.set("bonas-access-token", token, { expires: 7 })
            this.loading = false
            this.$router.push("/drafts")
            this.$store.commit("set_user", { ...user })
          })
          .catch(error => {
            this.loading = false
            this.password = ""
            cookies.remove("bonas-access-token")
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
}
</script>
