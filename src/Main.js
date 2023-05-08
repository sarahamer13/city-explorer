import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import Map from "./Map";
import axios from "axios";
import "./app.css";
import Weather from "./Weather";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
      cityMap: {},
      errorMessage: "",
      displayError: false,
      weatherData: [],
    };
  }

  handleInput = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleExplorer = async (e) => {
    e.preventDefault();
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(API);
      console.log(response.data[0]);
      this.setState({ location: response.data[0], displayError: false, errorMessage: "" }, () => {
        this.DisplayWeather();
      });
    } catch (error) {
      console.log("error.message", error.response.data.error);
      this.setState({
        errorMessage: error.response.status + ": " + error.response.data.error,
        location: {},
        displayError: true,
      });
    }
  };

  DisplayWeather = async () => {
    console.log('Server URL:', process.env.REACT_APP_SERVER);
    const weatherUrl = `${process.env.REACT_APP_SERVER}/weatherData?searchQuery=${this.state.searchQuery}`;
    try {
      const response = await axios.get(weatherUrl);
      this.setState({ weatherData: response.data });
    } catch (error) {
      console.log("Error fetching weather data:", error);
      console.log('Error response:', error.response);
      console.log('Error request:', error.request);

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
        {this.state.displayError ? <p>{this.state.errorMessage}</p> : null}
        {this.state.location.display_name && (
          <>
            <h2>{this.state.location.display_name}</h2>
            <p>Lat: {this.state.location.lat}</p>
            <p>Lon: {this.state.location.lon}</p>
            <img src={this.state.cityMap} alt="" />
            <Map lat={this.state.location.lat} lon={this.state.location.lon}></Map>
            {this.state.weatherData.length > 0 && (
            <Weather weatherData={this.state.weatherData} />
            )}
          </>
        )}
      </Container>
    );
  }
}

export default Main;
