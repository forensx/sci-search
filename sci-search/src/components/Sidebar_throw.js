<Sider width={400}>
        <Menu defaultSelectedKeys="miscExplanationHeader" mode="vertical">
          <SubMenu
            key="sub1"
            title={
              this.state.caseRender
                ? "Viewing: " + this.state.caseRender
                : "Choose a case"
            }
          >
            <Menu.ItemGroup style={{ width: "350px" }}>
              {userCases
                ? userCases.map((result) => (
                    <Menu.Item onClick={this.handleMenuClick} key={result}>
                      {result}
                    </Menu.Item>
                  ))
                : null}
            </Menu.ItemGroup>
          </SubMenu>
          {this.state.caseRender
            ? this.props.allCases[this.state.caseRender].bookmarks.map(
                (bookmark) => (
                  <Card
                    size="small"
                    title={bookmark.title.replace(
                      /(([^\s]+\s\s*){5})(.*)/,
                      "$1…"
                    )}
                    extra={
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={bookmark.url}
                      >
                        Paper link
                      </a>
                    }
                    style={{ marginTop: "2px" }}
                  >
                    <p>
                      {bookmark.abstract.replace(
                        /(([^\s]+\s\s*){20})(.*)/,
                        "$1…"
                      )}
                    </p>
                  </Card>
                )
              )
            : null}
        </Menu>
        <CiteExport
          caseNameProp={this.state.caseRender}
        />
      </Sider>