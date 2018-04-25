import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Todo from '../../components/Todo';

/* Component Styling */
const ListContainer = styled.ul`
    flex: 1 auto;
`;

/* Component */
class List extends Component {
    render() {
        console.log(this.props)
        const { props, _editTodo, _deleteTodo } = this;
        const { allTodos } = props;

        if(props.loading) {
            return(<div>Loading</div>);
        }
        if(props.error) {
            return(<div>Error</div>);
        }
              
        return(
            <ListContainer>
                {allTodos.map(todo => 
                    <Todo 
                        key={todo.id}
                        {...todo} />)}
            </ListContainer>
        )
    }
}

/* Without Link State */
/*
const FEED_QUERY = gql`
    query{
        allTodos{
            id
            content
            isCompleted
        }
    }
`;

export default graphql(FEED_QUERY)(List);
*/

// Query from the client state and data from Graphql Server
/*
const FEED_QUERY_CLIENT = gql`
    query {
        visibilityFilter @client {
            filter
        }
        queryFromResolve @client
        allTodos{
            id
            content
            isCompleted
        }
    }
`;
*/

const TODO_QUERY_SERVER = gql`
    query {
        allTodos{
            id
            content
            isCompleted
        }
    }
`;

const TODO_QUERY_CLIENT = gql`
    query {
        appState @client {
            todos
        }
        queryFromResolve @client
    }
`;

const TODO_SET_CLIENT = gql`
    mutation SetTodoState($index: String!, $value: String!) {
        setTodoState(index: $index, value: $value) @client {
            todos
        }
    }
`;
/*
export default compose(
    graphql(TODO_QUERY_SERVER, {
        props: ({ data: { loading, error, networkStatus, allTodos } }) => {
            if(loading) { return { loading }; }
            if(error) { return { error }; }
            return { loading, networkStatus, allTodos };
        }
    }),
    graphql(TODO_QUERY_CLIENT, {
        props: ({ data: { loading, error, networkStatus, appState } }) => {
            if(loading) { return { loading }; }
            if(error) { return { error }; }
            console.log(this)
            return { loading, networkStatus, appState };
        }
    }),
    graphql(TODO_SET_CLIENT, { name: 'setTodoState' }),
)(List);
*/

export default compose(
    graphql(TODO_QUERY_SERVER, {
        props: ({ data: { loading, error, networkStatus, allTodos } }) => {
            if(loading) { return { loading }; }
            if(error) { return { error }; }
            return { loading, networkStatus, allTodos };
        }
    })
)(List);