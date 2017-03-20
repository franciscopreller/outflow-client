import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import AddConnectionIcon from 'material-ui/svg-icons/content/add-circle';
import PreferencesIcon from 'material-ui/svg-icons/action/settings';
import {addConnection} from '../../routes/Home/modules/connection';

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

  handleAddNewConnection() {
    this.context.store.dispatch(addConnection({
      host: 'thresholdrpg.com',
      port: 23,
      name: 'Threshold RPG'
    }));

    // Close the dialog
    this.handleCloseDialog();
  }

  render() {
    const navigationItems = [{
      primaryText: 'New Connection',
      leftIcon: <AddConnectionIcon />,
      onTouchTap: () => {
        this.setState({
          open: false,
          addConnectionDialogOpen: true,
        });
      },
    }, {
      primaryText: 'Preferences',
      leftIcon: <PreferencesIcon />,
      onTouchTap: () => alert('clicked preferences'),
    }];

    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label="Add Connection"
        primary={true}
        onTouchTap={this.handleAddNewConnection}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Add a new Connection"
          actions={dialogActions}
          modal={true}
          open={this.state.addConnectionDialogOpen}
          onRequestClose={this.handleCloseDialog}>
        </Dialog>
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
