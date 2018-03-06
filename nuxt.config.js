module.exports = {
  mode: "universal",
  head: {
    // testing
    mode: "spa",
    title: "BONAS",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
      },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        href:
          "https://fonts.googleapis.com/css?family=Bungee|Space+Mono|Material+Icons",
        rel: "stylesheet"
      }
    ]
  },
  loading: { color: "#3B8070" },
  css: ["vuetify/dist/vuetify.css", "@/assets/css/main.css"],
  plugins: ["~/plugins/vuetify.js"],
  modules: ["@nuxtjs/apollo"],
  apollo: {
    clientConfigs: {
      default: "~/apollo/client-configs/default.js"
    }
  },
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ["~/plugins/vuetify.js"],
    extractCSS: true
  }
}
