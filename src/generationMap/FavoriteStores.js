import React, { Component, PropTypes } from 'react';

class FavoriteStores extends Component {
  static defaultProps = {
    previewStore: {}
  };

  static propTypes = {
    previewStore: PropTypes.object.isRequired
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
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.props.previewStore.Name ? this.renderPreviewStore() : ''}
      </div>
    );
  }
}

export default FavoriteStores;
