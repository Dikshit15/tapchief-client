import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "antd";
import { Alert } from "antd";
import request from "request";

class Index extends Component {
  state = {
    isRendering: false,
    text: null,
    success: null
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  async getdata(refThis) {
    request.post(
      {
        url: "https://thawing-eyrie-73297.herokuapp.com/index",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          text: refThis.state.text
        })
      },
      function(error, response, body) {
        if (error)
          refThis.setState({
            success: false
          });
        else {
          if (JSON.parse(body)["success"] === true) {
            refThis.setState({
              success: true
            });
          } else {
            refThis.setState({
              success: false
            });
          }
        }
        console.log(body);
        console.log(body["success"]);
        refThis.setState({
          isRendering: false
        });
      }
    );
  }

  handleSubmit = event => {
    const refThis = this;
    this.setState(
      {
        isRendering: true
      },
      () => {
        console.log("something");
        refThis.getdata(refThis);
      }
    );
    event.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        {this.state.success === true && (
          <Alert message="Successfully indexed" type="success" />
        )}
        {this.state.success === false && (
          <Alert message="Not able to index data" type="error" />
        )}

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="form.textarea">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.isRendering && (
            <Button variant="primary" type="submit" disabled>
              Submit
            </Button>
          )}
          {!this.state.isRendering && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </Form>
      </React.Fragment>
    );
  }
}

export default Index;
