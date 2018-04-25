import gql from 'graphql-tag';
import { Query } from 'react-apollo';

/** 
 * How mutation work on resolver:
 * 1 - Parameters of mutation
 * 2 - Cache
 * 3 - Query to cache
 * 4 - Read from cache
 * 5 - Update according to parameters
 * 6 - Write in the cache
 */

export default {
    Mutation: {
        // 1 and 2
        setAppState: (_, { index, value }, { cache }) => {
            // 3
            const query = gql`
                query {
                    appState @client {
                        currentScreen
                    }
                }
            `;

            // 4
            const previousState = cache.readQuery({ query });

            // 5
            const data = {
                appState: {
                    ...previousState.appState,
                    [index]: value
                }
            };

            // 6
            cache.writeData({ query, data });

            return null;
        },
        setTodoState: (_, { index, value }, { cache }) => {
            const query = gql`
                query {
                    appState @client {
                        todos
                    }
                }
            `;

            const previousState = cache.readQuery({ query });

            const data = {
                appState: {
                    ...previousState.appState,
                    [index]: value
                }
            };

            cache.writeData({ query, data });

            return null;
        }
    }
}