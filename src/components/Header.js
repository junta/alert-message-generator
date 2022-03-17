import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#000000' }}>
      <Toolbar>Alert Message Generator - dYdX Tradingview Strategy Integration</Toolbar>
    </AppBar>
  );
};

export default Header;
