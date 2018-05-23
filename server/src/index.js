import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "/api/graphql"
});





ReactDOM.render(<ApolloProvider client={client}><App />  </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
