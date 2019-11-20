import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import request from "request";
import Index from "../../components/Index";
import Search from "../../components/Search";
import api from "../../utils/api";

const { Header, Content } = Layout;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  // state = {};
  handleClickAction = () => {
    request.delete(
      {
        url: api + "clear",
        headers: {
          "content-type": "application/json"
        }
      },
      function(error, response, body) {
        if (error === null) {
          alert("Cleared");
        }
      }
    );
  };
  render() {
    return (
    <div>
      <Layout>
        <Router>
          <Header style={{  zIndex: 5, width: "400%", color:"yellow" }} >
            <div className="logo" />
            <Menu
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "60px" }}
            >
            </Menu>
          </Header>
          <button>
              <Link to="/"> Click Here for Index</Link>
          </button>
          <button>
              <Link to="/search"> Click Here for Search</Link>
          </button>
          <Button onClick={this.handleClickAction}>
            <b>Clear Previously Indexed Data</b>
          </Button>
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
          </Content>
        </Router>
      </Layout>
    </div>
    );
  }
}

export default App;
