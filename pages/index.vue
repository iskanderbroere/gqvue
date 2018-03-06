<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-toolbar flat>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            nuxt
            large
            to="/new"
            flat>New post<v-icon right>create</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>
    <v-flex
      v-for="card in feed"
      :key="card.id"
      tag="article"
      sm12
      md6
      lg4
    >
      <v-card tile>
        <v-card-media
          src="https://source.unsplash.com/random/500x400"
          height="250px"
        />
        <v-card-title primary-title>
          <div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn icon>
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>bookmark</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>share</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import feed from "~/apollo/queries/feed"

export default {
  data() {
    return {
      feed: []
    }
  },
  apollo: {
    feed: {
      prefetch: true,
      query: feed
    }
  }
}
</script>
