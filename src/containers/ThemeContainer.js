import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';

// Set color palette
const palette = {
  primary1Color: Colors.teal500,
  primary2Color: Colors.teal400,
  primary3Color: Colors.teal300,
  accent1Color: Colors.indigo400,
  accent2Color: Colors.indigo300,
  accent3Color: Colors.indigo200,
  canvasColor: Colors.grey50,
  textColor: Colors.grey800,
};

const muiTheme = getMuiTheme({
  palette,
  appBar: {
    height: 64,
    color: Colors.teal500,
    textColor: Colors.grey50,
  },
  tabs: {
    backgroundColor: Colors.teal200,
    textColor: Colors.grey50,
    selectedTextColor: Colors.grey50,
  }
});

// I know... not really a container
export const ThemeContainer = ({ children }) => (
  <MuiThemeProvider muiTheme={ muiTheme }>
    { children }
  </MuiThemeProvider>
);

export default ThemeContainer;
