<template>
  <v-app>
    <v-toolbar 
      height="120"
      color="secondary" 
      dark 
      app>
      <v-toolbar-title>
        <h1>BONAS</h1>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer app/>
  </v-app>
</template>
