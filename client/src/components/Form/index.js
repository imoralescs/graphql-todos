import React, { Component } from 'react';
import styled from 'styled-components';

/* Component Styling */
const HeaderForm = styled.div`form {}`;
const HeaderFormGroup = styled.div`
    display: inline-block;
    width: calc(100% - 94px);
    vertical-align: top;
`;
const HeaderFormInput = styled.input`
    padding: 12px 10px;
    font-size: 16px;
    color: #555;
    border: 0px solid #aaa;
    border-bottom: 1px solid #e0e0e0;
    background-color: #fff;
    outline: none;
    width: 100%;
`;
const HeaderFormButton = styled.button`
    background-color: #FFF;
    cursor: pointer;
    display: inline-block;
    line-height: 2rem;
    position: relative;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: none;
    outline: none;
    border: 0px solid #aaa;
    border-bottom: 1px solid #e0e0e0;
    font-weight: 600;
    padding: 6px 8px 4px;
    margin: 0 0 0 4px;
    vertical-align: top;
`;

/* Component */
export default class Form extends Component {
    render() {   
        const { content, onChange, createTodo } = this.props;    
        return(
            <HeaderForm>
                <form onSubmit={createTodo}>
                    <HeaderFormGroup>
                        <HeaderFormInput
                            className=''
                            value={content}
                            onChange={onChange}
                            type='text'
                            placeholder='Type a new todo'/>
                    </HeaderFormGroup>
                    <HeaderFormButton type='submit'>Add Todo</HeaderFormButton>
                </form>
            </HeaderForm>
        )
    }
}