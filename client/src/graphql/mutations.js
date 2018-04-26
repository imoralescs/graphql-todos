import gql from 'graphql-tag';

// Changes on state - Syntax GraphQl mutation = @client + Resolver
export const SET_APP_STATE = gql`
    mutation SetAppState($index: String!, $value: String!) {
        setAppState(index: $index, value: $value) @client {
            currentScreen
        }
    }
`;

export const POST_TODO_MUTATION = gql`
    mutation createTodo($content: String!, $isCompleted: Boolean!) {
        createTodo(content: $content, isCompleted: $isCompleted){
            id
            content
            isCompleted
        }
    }
`;

export const PUT_TODO_MUTATION = gql`
    mutation updateTodo($id: ID!, $content: String!, $isCompleted: Boolean!) {
        updateTodo(id: $id, content: $content, isCompleted: $isCompleted){
            id
            content
            isCompleted
        }
    }
`;

export const DELETE_TODO_MUTATION = gql`
    mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id){
            id
            content
            isCompleted
        }
    }
`;