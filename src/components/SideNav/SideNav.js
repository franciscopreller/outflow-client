import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import AddConnectionIcon from 'material-ui/svg-icons/content/add-circle';
import PreferencesIcon from 'material-ui/svg-icons/action/settings';
import { addConnection } from '../../modules/connection/actions';
import AddConnectionDialog from './AddConnectionDialog';

export class SideNav extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      addConnectionDialogOpen: false,
    };
    this.handleRequestChange = this.handleRequestChange.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleAddNewConnection = this.handleAddNewConnection.bind(this);
  }

  getStyles() {
    return {
      headerTitleStyle: {
        fontSize: '20px',
        height: '128px',
      },
    };
  }

  handleRequestChange(open) {
    this.setState({open});
  }

  handleCloseDialog() {
    this.setState({
      addConnectionDialogOpen: false,
    });
  }

  handleOpenDialog() {
    this.setState({
      open: false,
      addConnectionDialogOpen: true,
    });
  }

  handleAddNewConnection({ host, port, name }) {
    this.context.store.dispatch(addConnection({ host, port, name }));

    // Close the dialog
    this.handleCloseDialog();
  }

  render() {
    const navigationItems = [{
      primaryText: 'New Connection',
      leftIcon: <AddConnectionIcon />,
      onTouchTap: this.handleOpenDialog,
    }, {
      primaryText: 'Preferences',
      leftIcon: <PreferencesIcon />,
      onTouchTap: () => alert('clicked preferences'),
    }];

    return (
      <div>
        <AddConnectionDialog
          handleCloseDialog={this.handleCloseDialog}
          handleOpenDialog={this.handleOpenDialog}
          handleAddNewConnection={this.handleAddNewConnection}
          open={this.state.addConnectionDialogOpen}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={this.handleRequestChange}>
          <AppBar title="OutFlow" showMenuIconButton={false} titleStyle={this.getStyles().headerTitleStyle}/>
          {navigationItems.map((item, key) => <MenuItem key={`snav__${key}`} {...item} />)}
        </Drawer>
      </div>
    );
  }
}

export default SideNav;
