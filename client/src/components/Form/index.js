import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Form extends Component {
    state = {
        content:''
    };

    _createTodo = async () => {
        const { content } = this.state;
        await this.props.createTodo({
            variables: {
                content,
                isCompleted: false
            }
        });
    }

    render() {   
        console.log(this.props)    
        return(
            <div>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={this.state.todo}
                        onChange={e => this.setState({ content: e.target.value })}
                        type="text"
                        placeholder="Todo"/>
                </div>
                <button onClick={() => this._createTodo()}>Submit</button>
            </div>
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

export default graphql(POST_QUERY, { name: 'createTodo'})(Form);