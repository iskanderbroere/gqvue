import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

export default ctx => {
  const httpLink = new HttpLink({ uri: "http://localhost:4000" })

  const middlewareLink = new ApolloLink((operation, forward) => {
    // const token = process.server ? ctx.req.session : ""
    // console.log(ctx.req)
    debugger

    operation.setContext({
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjamViZ2Ntdzg4c3l2MDEzNGJhcmVpZWg5IiwiaWF0IjoxNTIwMDg2Nzg1fQ.tz-6BX8ZWW-SXSMKmTUqsBHKwIlZ88jyZxaPl3mNcZg"
      }
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
