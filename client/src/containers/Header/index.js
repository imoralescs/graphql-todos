import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Form from '../../components/Form';

/* Component Styling */
const HeaderContainer = styled.header`
    position: relative;
    margin-bottom: 4px;
`;

const HeaderTitle = styled.div`
    height: 60px;
    background: #5f98cd;
    display: block;
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    margin-bottom: 2px;
`;

/* Component */
class Header extends Component {
    state = {
        content:''
    };

    _createTodo = (event) => {
        const { content } = this.state;
        event.preventDefault();
        
        this.props.createTodo({
            variables: {
                content,
                isCompleted: false
            },
            // Update client cache data
            update: (store, { data: { createTodo }}) => {
                const 
                    query = gql`
                        query {
                            allTodos{
                                id
                                content
                                isCompleted
                            }
                        }
                    `;
                const 
                    data = store.readQuery({ query });
                data.allTodos.push(createTodo);
                store.writeQuery({ query , data });
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
            <HeaderContainer>
                <HeaderTitle>Todo App</HeaderTitle>
                <Form 
                    content={content} 
                    onChange={_onChange} 
                    createTodo={_createTodo}/>
            </HeaderContainer>
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