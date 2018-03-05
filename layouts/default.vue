<template>
  <v-app>
    <v-toolbar
      height="120"
      color="secondary"
      dark
      flat
      app>
      <v-container fill-height 
                   class="py-0">
        <v-layout>
          <v-toolbar-title>
            <h1>BONAS</h1>
          </v-toolbar-title>
          <v-spacer/>
          <v-toolbar-items>
            <v-btn nuxt to="/" flat>Home</v-btn>
            <v-btn nuxt to="/login" flat>Login</v-btn>
          </v-toolbar-items>
        </v-layout>
      </v-container>
    </v-toolbar>
    <v-content>
      <v-container 
        grid-list-xl
        tag="section">
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer app/>
  </v-app>
</template>

<style lang="postcss" scoped>
.toolbar__title {
  margin-left: 0;
  display: flex;
  align-items: center;
}
.toolbar__title h1 {
  font-size: 62px;
}
</style>
