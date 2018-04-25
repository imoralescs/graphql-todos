import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Header from './Header';
import List from './List';

import { APP_STATE } from '../graphql/queries';
import { SET_APP_STATE } from '../graphql/mutations';

import { globalStyling } from './globalStyling.js';

globalStyling();
/*
export default function App() {
    return(
        <div>
            <Header />
            <List />
        </div>
    )
}
*/

class App extends Component {
    _setCurrentScreen = scene => {
        scene = 'Home';
        this.props.setAppState({
            variables: {
                index: 'currentScreen',
                value: scene
            }
        });
    };

    render() {
        console.log(this.props) 
        return(
            <div>
                <Header />
                <List />
                <button onClick={this._setCurrentScreen}>Change State - State: {this.props.appState.currentScreen}</button>
            </div>
        )
    }
}

export default compose(
    graphql(APP_STATE, {
        props: ({ data: { loading, error, networkStatus, appState } }) => {
            if(loading) { return { loading }; }
            if(error) { return { error }; }
            return { loading, networkStatus, appState };
        }
    }),
    graphql(SET_APP_STATE, { name: 'setAppState' }),
)(App);