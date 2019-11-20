import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import request from "request";
import Index from "../../components/Index";
import Search from "../../components/Search";

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {};
  handleClick = () => {
    request.delete(
      {
        url: "https://thawing-eyrie-73297.herokuapp.com/clear",
        headers: {
          "content-type": "application/json"
        }
      },
      function(error, response, body) {
        if (error === null) {
          console.log("Cleared");
        }
      }
    );
  };
  render() {
    return (
      <Layout>
        <Router>
          <Header style={{ position: "fixed", zIndex: 5, width: "100%" }}>
            <div className="logo" />

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to="/">Index</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/search">Search</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <br />
          <br />
          <Content style={{ padding: "0 50px", marginTop: 150 }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
              <Switch>
                <Route path="/search">
                  <Search />
                </Route>
                <Route path="/">
                  <Index />
                </Route>
              </Switch>
            </div>
            <Button type="danger" onClick={this.handleClick}>
              Clear
            </Button>
          </Content>
        </Router>

        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default App;
