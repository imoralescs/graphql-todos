import gql from 'graphql-tag';

// Changes on state - Syntax GraphQl mutation = @client + Resolver
export const SET_APP_STATE = gql`
    mutation SetAppState($index: String!, $value: String!) {
        setAppState(index: $index, value: $value) @client {
            currentScreen
        }
    }
`;