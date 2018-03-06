import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import cookie from "cookie"
import jscookies from "js-cookie"

export default ({ req }) => {
  const httpLink = new HttpLink({ uri: "http://localhost:4000" })
  const middlewareLink = new ApolloLink((operation, forward) => {
    const cookies = () => {
      if (process.server) {
        return cookie.parse(req.headers.cookie || "")
      } else if (process.client) {
        return {
          "bonas-access-token": jscookies.get("bonas-access-token") || ""
        }
      }
      return {}
    }
    if (cookies().hasOwnProperty("bonas-access-token")) {
      const token = "Bearer " + cookies()["bonas-access-token"]
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
