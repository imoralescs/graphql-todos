import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Todo from '../../components/Todo';
import { 
    TODO_QUERY_SERVER, 
    TODO_QUERY_SERVER_AND_CLIENT 
} from '../../graphql/queries';

/* Component Styling */
const ListContainer = styled.ul`
    flex: 1 auto;
`;

/* Component */
class List extends Component {
    render() {
        const { props, _editTodo, _deleteTodo } = this;
        const { allTodos, loading, error } = props;

        if(loading) {
            return(<div>Loading</div>);
        }
        if(error) {
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
// export default graphql(TODO_QUERY_SERVER)(List);


/* Query from the client state and data from Graphql Server */
export default compose(
    graphql(TODO_QUERY_SERVER_AND_CLIENT, {
        props: ({ data: { loading, error, networkStatus, allTodos } }) => {
            if(loading) { return { loading }; }
            if(error) { return { error }; }
            return { loading, error, networkStatus, allTodos };
        }
    })
)(List);