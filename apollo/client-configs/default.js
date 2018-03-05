import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

export default ({ store }) => {
  const httpLink = new HttpLink({ uri: "http://localhost:4000" })

  const middlewareLink = new ApolloLink((operation, forward) => {
    if (store.state.user) {
      // const token = process.server
      //   ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjamViZ2Ntdzg4c3l2MDEzNGJhcmVpZWg5IiwiaWF0IjoxNTIwMDg2Nzg1fQ.tz-6BX8ZWW-SXSMKmTUqsBHKwIlZ88jyZxaPl3mNcZg"
      //   : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjamViZ2Ntdzg4c3l2MDEzNGJhcmVpZWg5IiwiaWF0IjoxNTIwMDg2Nzg1fQ.tz-6BX8ZWW-SXSMKmTUqsBHKwIlZ88jyZxaPl3mNcZg"
      operation.setContext({
        headers: {
          authorization: `Bearer ${store.state.user.token}`
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
