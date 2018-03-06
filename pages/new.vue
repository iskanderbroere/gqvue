<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="title"
      :rules="titleRules"
      :counter="255"
      required
      label="Title"
    />
    <v-text-field
      v-model="text"
      :rules="textRules"
      textarea
      required
      label="Text"
    />
    <v-btn
      :disabled="!valid"
      @click="newPost"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
import makeDraft from "~/apollo/mutations/makeDraft"
import drafts from "~/apollo/queries/drafts"

export default {
  data: () => ({
    valid: false,
    title: "",
    titleRules: [
      v => !!v || "Title is required",
      v => v.length <= 255 || "Title must be less than 255 characters"
    ],
    text: "",
    textRules: [
      v => !!v || "Text is required"
      // v =>
      //   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      //   "Text must be valid"
    ]
  }),
  methods: {
    newPost() {
      this.alert = null
      this.loading = true
      this.$apollo
        .mutate({
          mutation: makeDraft,
          variables: {
            title: this.title,
            text: this.text
          },
          update: (store, { data: { createDraft } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: drafts })
            // Add our tag from the mutation to the end
            data.drafts.push(createDraft)
            // Write our data back to the cache.
            store.writeQuery({ query: drafts, data })
          },
          optimisticResponse: {
            __typename: "Mutation",
            createDraft: {
              __typename: "Post",
              id: -1,
              title: this.title,
              text: this.text
            }
          }
        })
        .then(() => {
          this.loading = false
          this.$router.push("/drafts")
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
