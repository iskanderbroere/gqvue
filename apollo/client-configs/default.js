import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import cookie from "cookie"

export default ctx => {
  const httpLink = new HttpLink({ uri: "http://localhost:4000" })
  const middlewareLink = new ApolloLink((operation, forward) => {
    const cookies = () => {
      if (process.server) {
        return cookie.parse(ctx.req.headers.cookie || "")
      } else if (process.client && ctx.store.state.user) {
        return { "bonas-access-token": ctx.store.state.user.token }
      }
      return {}
    }
    if (cookies().hasOwnProperty("bonas-access-token")) {
      const token = `Bearer ${cookies()["bonas-access-token"]}`
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
