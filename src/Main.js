import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import Map from "./Map";
import axios from "axios";
import "./app.css";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // displayInfo: false,
      searchQuery: "",
      location: {},
      cityMap: {},
      errorMessage: "",
      displayError: false,
    };
  }

  handleInput = (event) => {
    this.setState({ searchQuery: event.target.value }, () => {
      console.log(this.state.searchQuery);
    });
  };

  handleExplorer = async (e) => {
    e.preventDefault();
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(API);
      console.log(response.data[0]);
      this.setState({ location: response.data[0], displayError: false, errorMessage: "" }); // if API goes through, this will update the state with location info
    } catch (error) {  /// This will only execute if an error happens in the try block
      console.log ("error.message",error.response.data.error);
      this.setState({
        errorMessage: error.response.status + ': ' + error.response.data.error,
        location: {},
        displayError: true,
      });
      console.log(this.state.errorMessage)
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleExplorer}>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" onChange={this.handleInput} />
          </Form.Group>
          <Button type="submit">Explore!</Button>
        </Form>
        {this.state.displayError ? (
              <p>{this.state.errorMessage}</p>
            ): null}
        {this.state.location.display_name && ( // conditional rendering if line 61 has a value, API will go through
          <>
            <h2>{this.state.location.display_name}</h2>         
            <p>Lat: {this.state.location.lat}</p>
            <p>Lon: {this.state.location.lon}</p>
            <img src={this.state.cityMap} alt="" />
            <Map lat={this.state.location.lat} lon={this.state.location.lon}></Map>
          </>
        )}
      </Container>
    );
  }
}

export default Main;
