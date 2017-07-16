import React, { PropTypes } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';

const StoreInfo = ({ btnTooltip, closeBanner, store }) => {
  const rightButton = (
    <IconButton
      tooltip={btnTooltip}
      iconStyle={{
        color: 'rgba(0, 0, 0, 0.6)',
        width: '30px',
        height: '30px'
      }}
      hoveredStyle={{ color: '#000' }}
      onClick={closeBanner}
    >
      <NavigationCancel />
    </IconButton>
  );

  return (
    <MuiThemeProvider>
      <ListItem
        primaryText={store.Name}
        rightIconButton={rightButton}
        secondaryText={store.Address}
      />
    </MuiThemeProvider>
  );
};

StoreInfo.propTypes = {
  btnTooltip: PropTypes.string.isRequired,
  closeBanner: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
};

export default StoreInfo;
