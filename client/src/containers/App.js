import React from 'react';
import Header from './Header';
import List from './List';
import { globalStyling } from './globalStyling.js';

globalStyling();

export default function App() {
    return(
        <div>
            <Header />
            <List />
        </div>
    )
}