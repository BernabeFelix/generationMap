import React, { Component, PropTypes } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import {
  BottomNavigation,
  BottomNavigationItem
} from 'material-ui/BottomNavigation';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';

class Banner extends Component {
  static defaultProps = {
    isMarkerSelectedFavorite: false
  };

  static propTypes = {
    markerData: PropTypes.object.isRequired
  };

  render() {
    const deleteFavoriteButton = (
      <IconButton
        tooltip="remove"
        iconStyle={{
          color: 'rgba(0, 0, 0, 0.6)',
          width: '30px',
          height: '30px'
        }}
        hoveredStyle={{ color: '#000' }}
        onClick={() => {
          console.log(`store removed click: ${i}`);
        }}
      >
        <NavigationCancel />
      </IconButton>
    );

    return (
      <MuiThemeProvider>
        <div
          style={{
            backgroundColor: 'white',
            bottom: '0',
            position: 'absolute',
            width: '100%'
          }}
        >
          <List>
            <ListItem
              primaryText={this.props.markerData.Name}
              rightIconButton={deleteFavoriteButton}
              secondaryText={this.props.markerData.Address}
            />
          </List>
          <BottomNavigation
            selectedIndex={this.props.isMarkerSelectedFavorite ? 0 : -1}
          >
            <BottomNavigationItem
              label="Favorites"
              icon={<ActionFavorite />}
              onTouchTap={() => console.log('Im in favorites')}
            />
          </BottomNavigation>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Banner;
