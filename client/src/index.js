import React from 'react';
import ReactDOM from 'react-dom';

import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const httpLink = new HttpLink({url: 'http://localhost:7000//graphql'});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const App = () => {
    
        return(
            <div><h1>Hello Apollo</h1></div>
        )
    
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);