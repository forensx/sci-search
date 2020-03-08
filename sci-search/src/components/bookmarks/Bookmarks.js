import React, { Component } from 'react'
import Bookmark from './Bookmark';
import PropTypes from "prop-types";

export class Bookmarks extends Component {
    render() {
        return this.props.bookmarks.map(paper => (
             <Bookmark results={paper} key={this.props.bookmarks.ID}/>
        ));
    }
}

export default Bookmarks

Bookmarks.propTypes = {
    bookmarks: PropTypes.array.isRequired
};