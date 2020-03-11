import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class BookmarkItem extends Component {
    
    render() {
        return (
            <div style = {{background: "purple", color: "white"}}>
                {this.props.bookmark.title}
            </div>
        );
    }
}

BookmarkItem.propTypes = {
    bookmark: PropTypes.object.isRequired
}
