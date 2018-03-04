<template>
  <v-container fluid grid-list-xl tag="section">
    <v-layout row wrap>
      <v-flex
        v-for="card in feed"
        :key="card.id"
        tag="article"
        sm12
        md6
        lg4
      >
        <v-card>
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
  </v-container>
</template>

<script>
import feed from "~/apollo/queries/feed"

export default {
  apollo: {
    feed: {
      prefetch: true,
      query: feed
    }
  },
  head: {
    title: "Cars with Apollo"
  }
}
</script>
