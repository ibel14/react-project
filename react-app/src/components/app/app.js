import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';
import styled from 'styled-components';


const App = () => {

    const data = [
        {label: "Going to learn React!! Shiish :)", important: true, id: 'asd'},
        {label: "How about pizza?", important: false, id: 'cvb'},
        {label: "My first twitt!", important: false, id: 'fth'}
    ];

    return (
        <div className="app">
            <AppHeader/>
                <div className="search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
                </div>
                <PostList posts={data}/>
                <PostAddForm/>
        </div>
    )
}

export default App;