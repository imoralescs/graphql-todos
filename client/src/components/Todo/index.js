import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TodoEdit from '../TodoEdit';
import styled from 'styled-components';

/* Component Styling */
const TodoItem = styled.li`
    border: 1px solid;
    border-color: #e5e6e9 #dfe0e4 #d0d1d5;
    border-radius: 3px;
    background-color: #fff;
    margin-bottom: 4px;
    display: block;
    position: relative;
    display: flex;
    padding: 10px 4px;
`;
const TodoContent = styled.span`
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    line-height: 1.5;
`;
const TodoButton = styled.button`
    background-color: #f6f7f9;
    border-color: #ced0d4;
    color: #4b4f56;
    border: 1px solid;
    border-radius: 2px;
    font-size: 12px;
    font-weight: bold;
    padding: 0 8px;
    position: relative;
    text-align: center;
    text-shadow: none;
    vertical-align: middle;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    white-space: nowrap;
    margin: 0px 4px;
    width: 64px;
    line-height: 1.9;
`;

/* Component */
class Todo extends Component {
    state = {
        edit: false,
        content: '' || this.props.content,
        isCompleted: null || this.props.isCompleted,
        id: null || this.props.id
    }

    _editTodo = (id, content, isCompleted) => {
        this.props.updateTodo({
            variables: { 
                id, 
                content, 
                isCompleted
            }
        });
        this.setState({ 
            edit : !this.state.edit 
        });
    }

    _deleteTodo = (id) => {
        this.props.deleteTodo({
            variables: { 
                id 
            },
            // Update client cache data
            update: (store, { data: { deleteTodo }}) => {
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
                    previous = store.readQuery({ query });
                const
                    { allTodos } = previous,
                    earlier = allTodos.filter(todo => todo.id !== deleteTodo.id),
                    data = Object.assign({}, ...previous, {allTodos : earlier});
                store.writeQuery({ query , data });
            }
        });
    }

    _showTodoEdit = () => {
        this.setState({ 
            edit : !this.state.edit 
        });
    }

    _onChange = (event) => {
        this.setState({ 
            content: event.target.value
        });
    }

    render() {
        let 
            element;
        const 
            { _showTodoEdit, 
              _editTodo,
              _deleteTodo, 
              _onChange, 
              props, 
              state } = this,
            { content, 
              id, 
              isCompleted } = state;
        if(this.state.edit) {
            element = (
                <TodoEdit
                    _editTodo={_editTodo}
                    _showTodoEdit={_showTodoEdit}
                    _onChange={_onChange}
                    content={content}
                    isCompleted={isCompleted}
                    id={id} />
            )
        }
        else {
            element = (
                <TodoItem>
                    <TodoContent>{content}</TodoContent>
                    <TodoButton onClick={_showTodoEdit}>Edit</TodoButton>
                    <TodoButton onClick={() => _deleteTodo(id)}>Delete</TodoButton>
                </TodoItem>
            )
        }
        return(element)
    }
}

const PUT_QUERY = gql`
    mutation updateTodo($id: ID!, $content: String!, $isCompleted: Boolean!) {
        updateTodo(id: $id, content: $content, isCompleted: $isCompleted){
            id
            content
            isCompleted
        }
    }
`;

const DELETE_QUERY = gql`
    mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id){
            id
            content
            isCompleted
        }
        deleteTodoCache(id: $id) @client
    }
`;

export default compose(
    graphql(PUT_QUERY, { name: 'updateTodo'}),
    graphql(DELETE_QUERY, { name: 'deleteTodo'})
)(Todo);




