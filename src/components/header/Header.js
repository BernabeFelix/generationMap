import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from './AppBar';

class Header extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Header;
