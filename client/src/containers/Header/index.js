import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Form from '../../components/Form';

class Header extends Component {
    state = {
        content:''
    };

    _createTodo = async (event) => {
        const { content } = this.state;
        event.preventDefault();
        
        await this.props.createTodo({
            variables: {
                content,
                isCompleted: false
            }
        });

        this.setState({ 
            content: '' 
        });
    }

    _onChange = (event) => {
        this.setState({ 
            content: event.target.value 
        });
    }

    render() {
        const 
            { content } = this.state,
            { _onChange, _createTodo } = this;        
        return(
            <header className="header">
                <span className="header__title">Todo App</span>
                <Form 
                    content={content} 
                    onChange={_onChange} 
                    createTodo={_createTodo}/>
            </header>
        )
    }
}

const POST_QUERY = gql`
    mutation createTodo($content: String!, $isCompleted: Boolean!) {
        createTodo(content: $content, isCompleted: $isCompleted){
            id
            content
            isCompleted
        }
    }
`;

export default graphql(POST_QUERY, { name: 'createTodo'})(Header);