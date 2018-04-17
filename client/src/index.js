import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import App from './components/App';

const httpLink = new HttpLink({url: '/graphql'});

const client = new ApolloClient({
    link: httpLink,
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