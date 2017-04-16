import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import SignInIcon from 'material-ui/svg-icons/action/account-circle';
import SideNav from '../SideNav';
import pkg from '../../../package.json';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.openSideNavigation = this.openSideNavigation.bind(this);
  }

  openSideNavigation() {
    this.refs['sideNav'].handleRequestChange(true);
  }

  render() {
    const SignInButton = <FlatButton label="Sign In" icon={<SignInIcon />}/>;
    const headerTitleStyle = {
      fontSize: '20px',
    };

    return (
      <div>
        <SideNav ref="sideNav"/>
        <AppBar
          title={<span>OutFlow <span style={{ fontSize: '60%' }}>v{pkg.version}</span></span>}
          iconElementRight={SignInButton}
          titleStyle={headerTitleStyle}
          onLeftIconButtonTouchTap={this.openSideNavigation}
        />
      </div>
    );
  }
}

export default Header;
