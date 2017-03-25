import React, { Component, PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import ThemeContainer from './ThemeContainer';

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
        <ThemeContainer>
          <div>
            <Router history={browserHistory} children={routes} style={{ flex: 1 }} />
          </div>
        </ThemeContainer>
      </Provider>
    );
  }
}

export default AppContainer;
