import React, { Component } from 'react';
import CustomMap from './map/Map';
import Header from './header/Header';

class Container extends Component {
  cleanPreviewStore = () => {
    this.setState({
      previewStore: {}
    });
  };

  render() {
    return (
      <div style={divStyle}>
        <Header />
        <CustomMap />
      </div>
    );
  }
}

var divStyle = {
  border: 'red',
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 20
};

export default Container;
