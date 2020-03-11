import React, { Component } from "react";
import BookmarkItem from "./BookmarkItem";
import PropTypes from "prop-types";

export default class BookmarkList extends Component {
  render() {
    return this.props.bookmarks.map(bookmark => (
      <BookmarkItem
        key={bookmark.id}
        bookmark={bookmark}
        addBookmark={this.props.addBookmark}
        removeBookmark={this.props.removeBookmark}
      />
    ));
  }
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.array.isRequired
};
