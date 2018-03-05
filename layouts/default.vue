<template>
  <v-app>
    <v-toolbar
      height="120"
      color="secondary"
      dark
      flat
      app>
      <v-container fill-height class="py-0">
        <v-layout>
          <v-toolbar-title >BONAS</v-toolbar-title>
          <v-spacer/>
          <v-toolbar-items>
            <v-btn
              large
              nuxt
              to="/"
              flat>
              Home
            </v-btn>
            <v-btn
              v-if="!$store.state.user"
              large
              nuxt
              to="/login" 
              flat>
              Login
            </v-btn>
            <v-btn
              v-if="$store.state.user"
              large
              nuxt
              to="/account"
              flat>
              {{ $store.state.user.name }}<v-icon right>person_outline</v-icon>
            </v-btn>
          </v-toolbar-items>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
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
  font-size: 62px;
}
.layout .btn {
  display: flex;
  align-self: center;
}
</style>
