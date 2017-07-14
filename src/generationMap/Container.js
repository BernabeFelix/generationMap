import React, { Component } from 'react';
import FavoriteStores from './FavoriteStores';
import CustomMap from './Map';
import stores from '../data/store_directory.json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Container extends Component {
  constructor() {
    super();
    this.state = { stores };
  }

  cleanPreviewStore = () => {
    this.setState({
      previewStore: {}
    });
  };

  setNewPreviewStore = previewStore => {
    this.setState({
      previewStore
    });
  };

  render() {
    const stores = this.state.stores;

    return (
      <div style={divStyle}>
        <MuiThemeProvider>
          <FavoriteStores
            cleanPreviewStore={this.cleanPreviewStore}
            previewStore={this.state.previewStore}
          />
        </MuiThemeProvider>
        <CustomMap
          stores={stores}
          markerClickCallback={this.setNewPreviewStore}
        />
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
