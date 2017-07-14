import React, { Component, PropTypes } from 'react';

class FavoriteStores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteStores: []
    };
  }
  static defaultProps = {
    previewStore: {}
  };

  static propTypes = {
    previewStore: PropTypes.object.isRequired,
    cleanPreviewStore: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps, prevState) {
    // favorite stores increment
    if (prevState.favoriteStores.length < this.state.favoriteStores.length) {
      // clean preview store
      this.props.cleanPreviewStore();
    }
  }

  addStoreToFavorites = () => {
    this.setState((prevState, props) => ({
      favoriteStores: [...prevState.favoriteStores, props.previewStore]
    }));
  };

  renderPreviewStore = () => {
    return (
      <div>
        <h3>
          {this.props.previewStore.Name}
        </h3>
        <h3>
          {this.props.previewStore.Address}
        </h3>
        <button onClick={this.addStoreToFavorites}>Add to favorites</button>
      </div>
    );
  };

  renderStore(store, i) {
    return (
      <div key={i}>
        <span>
          {store.Name}
        </span>
        <span>
          {store.Address}
        </span>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.previewStore.Name ? this.renderPreviewStore() : ''}
        {this.state.favoriteStores.map(this.renderStore)}
      </div>
    );
  }
}

export default FavoriteStores;
