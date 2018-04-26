import gql from 'graphql-tag';

// To return Apollo State
export const APP_STATE = gql`
    query {
        appState @client {
            currentScreen
        }
    }
`;

// Return todos from server
export const TODO_QUERY_SERVER = gql`
    query{
        allTodos{
            id
            content
            isCompleted
        }
    }
`;

// Return todos from server and value from client
export const TODO_QUERY_SERVER_AND_CLIENT = gql`
    query {
        allTodos{
            id
            content
            isCompleted
        }
        queryFromResolve @client
    }
`;