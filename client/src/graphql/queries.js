import gql from 'graphql-tag';

// To return Apollo State
export const APP_STATE = gql`
    query {
        appState @client {
            currentScreen
        }
    }
`;