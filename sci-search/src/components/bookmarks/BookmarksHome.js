import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
const { Content } = Layout;

const mapStateToProps = (state) => ({
  allCases: state.bookmarksByCase,
}); // connect props to state store in Redux

class BookmarksHomeWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userCases = Object.keys(this.props.allCases);
    return (
      <React.Fragment>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#f0f2f5",
            }}
          >
            {userCases ? userCases.map((result) => <div>{result}</div>) : null}
          </Content>
        </Layout>
      </React.Fragment>
    );
  }
}

const BookmarksHome = connect(mapStateToProps)(BookmarksHomeWrapper); // connect to Redux state
export default BookmarksHome; // this is the component that is used in App
