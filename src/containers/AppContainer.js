import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import ThemeContainer from './ThemeContainer';
import HeaderContainer from './HeaderContainer';
import DashboardContainer from './DashboardContainer';
import '../styles/core.scss';

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <ThemeContainer>
          <div className="container">
            <HeaderContainer style={{ flex: 1 }}/>
            <DashboardContainer className="core-layout" />
          </div>
        </ThemeContainer>
      </Provider>
    );
  }
}

export default AppContainer;
