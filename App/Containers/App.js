import React, { Component } from "react";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import createStore from "../Redux";
import ReduxNavigation from "../Navigation/ReduxNavigation";

const store = createStore();
const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://api.graph.cool/simple/v1/cjcjjojxx388y0145fna3ipic"
  }),
  cache: new InMemoryCache()
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ReduxNavigation />
        </Provider>
      </ApolloProvider>
    );
  }
}
