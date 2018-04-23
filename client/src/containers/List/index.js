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
        if(props.data && props.data.loading) {
            return(<div>Loading</div>);
        }

        if(props.data && props.data.error) {
            return(<div>Error</div>);
        }
        
        const todos = props.data.allTodos;        
        return(
            <ListContainer>
                {todos.map(todo => 
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
const FEED_QUERY_CLIENT = gql`
    query {
        visibilityFilter @client {
            filter
        }
        allTodos{
            id
            content
            isCompleted
        }
    }
`;

export default graphql(FEED_QUERY_CLIENT)(List);