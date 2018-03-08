import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import cookie from "cookie"
import jscookies from "js-cookie"

export const hasCookie = req => {
  if (process.server) {
    return cookie.parse(req.headers.cookie || "")
  } else if (process.client) {
    return {
      "apollo-nuxt-auth-access-token":
        jscookies.get("apollo-nuxt-auth-access-token") || ""
    }
  }
  return null
}

export default ({ req }) => {
  const httpLink = new HttpLink({ uri: "http://localhost:4000" })
  const middlewareLink = new ApolloLink((operation, forward) => {
    const cookies = hasCookie(req)
    if (cookies.hasOwnProperty("apollo-nuxt-auth-access-token")) {
      const token = "Bearer " + cookies["apollo-nuxt-auth-access-token"]
      operation.setContext({
        headers: {
          authorization: token
        }
      })
    }
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
