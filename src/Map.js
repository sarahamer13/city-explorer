import React from "react";
import { Container } from "react-bootstrap";

class Map extends React.Component {
  render() {
    const { lat, lon } = this.props;

    return (
      <Container>
        <img
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${lat},${lon}&zoom=13&format=json`}
          alt=""
        />
      </Container>
    );
  }
}

export default Map;
