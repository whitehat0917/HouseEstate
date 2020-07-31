import React, { Component } from "react";
import { config } from '../../config.js';

export class HouseCard extends Component {
  render() {
    return (
      <div className="house-card">
        <img src={"http://" + config.serverAddress + "/images/" + this.props.image} />
        <div className="house-card-footer">
          <p className="house-card-name">{this.props.name}</p>
          <p className="house-card-reference">{this.props.reference}</p>
        </div>
      </div>
    );
  }
}

export default HouseCard;
