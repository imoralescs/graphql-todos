import React, { Component } from 'react';

export default class Form extends Component {
    render() {   
        const { content, onChange, createTodo } = this.props;    
        return(
            <form onSubmit={createTodo}>
                <div>
                    <input
                        className=''
                        value={content}
                        onChange={onChange}
                        type='text'
                        placeholder='Type a new todo'/>
                </div>
                <button type='submit'>Add Todo</button>
            </form>
        )
    }
}