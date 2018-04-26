import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { log, dir } from '../utils/console';

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
    Query: {
        queryFromResolve: (_, args, { cache }) => {
            log('Load query');
            return null;
        }
    },
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
        }
    }
}