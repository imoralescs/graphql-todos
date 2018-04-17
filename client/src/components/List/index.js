import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../Form';

class List extends Component {
    render() {
        const { props } = this;
        if(props.data && props.data.loading) {
            return(<div>Loading</div>);
        }

        if(props.data && props.data.error) {
            return(<div>Error</div>);
        }
        
        const todos = props.data.allTodos;        
        return(
            <div>
                <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
                <Form/>
            </div>
        )
    }
}

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