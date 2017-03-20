import React, { Component, PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#0071bf',
    primary2Color: '#0071bf',
    primary3Color: '#0071bf',
    accent1Color: '#0071bf',
    accent2Color: '#0071bf',
    accent3Color: '#0071bf',
    canvasColor: '#ffffff',
  },
  appBar: {
    height: 64,
    color: '#009688',
    textColor: '#efefef',
    borderBottom: '1px solid rgb(204, 204, 204)',
  },
});

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={routes} />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default AppContainer;
