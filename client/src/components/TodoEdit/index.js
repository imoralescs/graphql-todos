import React, { Component } from 'react';
import styled from 'styled-components';

/* Component Styling */
const TodoEditContainer = styled.div`
    display: flex;
    background: #FFF;
    border: 1px solid;
    border-color: #e5e6e9 #dfe0e4 #d0d1d5;
    border-radius: 3px;
    background-color: #fff;
    margin-bottom: 4px;
    position: relative;
    padding: 10px 4px;
`;
const TodoEditInput = styled.input`
    flex-grow: 1;
    font-size: 16px;
    color: #555;
    border: 0px solid #aaa;
    border-bottom: 1px solid #555;
    outline: none;
`;
const TodoEditButton = styled.button`
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
const TodoEdit = ({ _showTodoEdit, _editTodo, _onChange, id, content, isCompleted }) => {  
    return(
        <TodoEditContainer>
            <TodoEditInput 
                type="text"
                onChange={_onChange}
                defaultValue={content} />
            <TodoEditButton onClick={_showTodoEdit}>Discard</TodoEditButton>
            <TodoEditButton onClick={() => _editTodo(id, content, isCompleted)}>Save</TodoEditButton>
		</TodoEditContainer>
    )
}

export default TodoEdit;