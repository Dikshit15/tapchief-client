import React, { Component } from "react";
import request from "request";
import { AutoComplete, Button, Card } from "antd";
import api from "../../utils/api";

class Search extends Component {
  state = {
    dataSource: [],
    dataDisplayed: [],
    value: null,
    paragraphs: []
  };
  componentWillMount = () => {
    var refThis = this;
    request.get(
      {
        url: api + "getWords",
        headers: {
          "content-type": "application/json"
        }
      },
      function(error, response, body) {
        if (error === null) {
          body = JSON.parse(body);
          console.log(body);
          if (body["success"] === true) {
            refThis.setState(
              {
                dataSource: body["body"]["words"],
                dataDisplayed: body["body"]["words"]
              },
              () => {
                console.log(refThis.state.dataSource);
              }
            );
          }
        }
      }
    );
  };

  onSearch = searchText => {
    let dataDisplayed = [];
    let dataSource = this.state.dataSource;
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i].includes(searchText)) {
        dataDisplayed.push(dataSource[i]);
      }
    }
    this.setState({
      dataDisplayed: dataDisplayed
    });
  };

  onChange = value => {
    this.setState({ value });
  };

  handleClick = () => {
    console.log(this.state.value);
    const value = this.state.value;
    const refThis = this;
    request.get(
      {
        url: api + "search",
        headers: {
          "content-type": "application/json"
        },
        qs: {
          search: value
        }
      },
      function(error, response, body) {
        if (error === null) {
          body = JSON.parse(body);
          if (body["success"] === true) {
            const paragraphs = body["body"];
            if (paragraphs !== null) {
              refThis.setState({
                paragraphs
              });
            }
          }
        }
      }
    );
  };

  render() {
    const { dataDisplayed, value } = this.state;

    return (
      <React.Fragment>
        <AutoComplete
          dataSource={dataDisplayed}
          style={{ width: 200 }}
          onSearch={this.onSearch}
          onChange={this.onChange}
          placeholder="input here"
          value={value}
        />
        <Button htmlType="submit" type="primary" onClick={this.handleClick}>
          Search
        </Button>
        <br />
        <br />
        {this.props.paragraph.map((item, index) => <Card>{item}</Card>)}
      </React.Fragment>
    );
  }
}

export default Search;
