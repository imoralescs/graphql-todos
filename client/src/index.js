import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

import App from './containers/App';

const defaultState = {
    todos: [],
    visibilityFilter: 'SHOW_ALL'
}

const stateLink = withClientState({
    cache: new InMemoryCache(),
    defaults: defaultState
});

const httpLink = new HttpLink({
    url: '/graphql'
});

/* Without Link State */
/*
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});
*/

const client = new ApolloClient({
    link: ApolloLink.from([
        stateLink,
        httpLink
    ]),
    cache: new InMemoryCache()
});

// Test Graphql Server
/*
client.query({
    query: gql`
        query{
            allTodos{
                id
                content
                isCompleted
            }
        }
    `
}).then(response => console.log(response.data))
*/

const mountElement = document.getElementById('root');
ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    mountElement
);