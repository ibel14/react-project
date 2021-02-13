import React, {useState} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

function App() {
      
    const [data, setData] = useState([
        {label: "Going to learn React!! Shiish :)", important: true, like: false, id: 1},
        {label: "How about pizza?", important: false, like: false, id: 2},
        {label: "My first twitt!", important: false, like: false, id: 3}
    ]);

    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [maxId, setMaxId] = useState(4);

    const deteleItem = (id) => {
        setData((data) => {
            const index = data.findIndex(elem => elem.id === id);

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return newArr
        });
    }

    const addItem = (body) => {
        setMaxId(maxId +1)
        const newItem = {
            label: body,
            important: false,
            id: maxId
        }

        setData((data) => {
            const newArr = [...data, newItem];
            return newArr
        })

        // До этого момента переписал на хуки

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items 
        }

        return items.filter( (item) => {
            return item.label.indexOf(term) > -1
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader
                liked={liked}
                allPosts={allPosts}/>
                    <div className="search-panel d-flex">
                    <SearchPanel
                    OnUpdateSearch={this.OnUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                    </div>
                    <PostList
                     posts={visiblePosts}
                     onDelete={this.deteleItem}
                     onToggleImportant={this.onToggleImportant}
                     onToggleLiked={this.onToggleLiked}/>
                    <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}