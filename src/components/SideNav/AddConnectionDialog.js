import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export class AddConnectionDialog extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      host: '',
      port: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleHostChange = this.handleHostChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get buttonDisabled() {
    return (
      this.state.name.length === 0 &&
      this.state.host.length === 0 &&
      this.state.port <= 0
    );
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleHostChange(e) {
    this.setState({
      host: e.target.value
    });
  }

  handlePortChange(e) {
    this.setState({
      port: e.target.value
    });
  }

  handleSubmit() {
    this.props.handleAddNewConnection({
      name: this.state.name,
      host: this.state.host,
      port: parseInt(this.state.port),
    });
  }

  render() {
    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.props.handleCloseDialog}
      />,
      <FlatButton
        label="Add Connection"
        primary={true}
        disabled={this.buttonDisabled}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
        title="Add a new Connection"
        actions={dialogActions}
        modal={true}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        open={this.props.open}
        onRequestClose={this.props.handleCloseDialog}>
        <div>
          <TextField
            floatingLabelText="Connection Name"
            floatingLabelFixed={true}
            hintText="A name to display your connection as, ie: My Connection"
            value={this.state.name}
            onChange={this.handleNameChange}
            fullWidth={true}
          />
          <br/>
          <TextField
            floatingLabelText="Host"
            floatingLabelFixed={true}
            hintText="Hostname, ie: sample.com"
            value={this.state.host}
            onChange={this.handleHostChange}
            fullWidth={true}
          />
          <br/>
          <TextField
            floatingLabelText="Port"
            floatingLabelFixed={true}
            hintText="Port number, ie: 23"
            type="number"
            value={this.state.port}
            onChange={this.handlePortChange}
            fullWidth={true}
          />
        </div>
      </Dialog>
    );
  }
}

export default AddConnectionDialog;
