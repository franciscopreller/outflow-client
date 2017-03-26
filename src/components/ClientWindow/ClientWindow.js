import React from 'react';
import Paper from 'material-ui/Paper';
import './ClientWindow.scss';

export class ClientWindow extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      command: '',
      rows: 1,
    };

    // Bindings
    this.focusOnCommandPrompt = this.focusOnCommandPrompt.bind(this);
    this.handleCommandPromptChange = this.handleCommandPromptChange.bind(this);
    this.handleCommandPromptKeyPress = this.handleCommandPromptKeyPress.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
  }

  focusOnCommandPrompt() {
    this.refs.prompt.focus();
  }

  sendCommand(command) {
    this.props.sendCommand(command, this.props.uuid);
  }

  handleCommandPromptChange(e) {
    this.setState({
      command: e.target.value,
    });
  }

  handleCommandPromptKeyPress(e) {
    // Allow multi-line only for shift+enter and let enter be the submit key
    if (e.keyCode === 13 && !e.shiftKey) {
      this.sendCommand(this.state.command);
      this.setState({
        command: '',
        rows: 1,
      });
    } else if (e.keyCode === 13 && e.shiftKey) {
      this.setState({
        rows: this.state.rows + 1,
      })
    }
  }

  render() {
    return (
      <div className="client-window-wrapper">
        <Paper zDepth={2} className="client-window">
          <Paper className="client-content" onTouchTap={this.focusOnCommandPrompt}>
            { this.props.children }
          </Paper>
          <textarea
            ref="prompt"
            className="client-command-line"
            rows={this.state.rows}
            value={this.state.command}
            onChange={this.handleCommandPromptChange}
            onKeyDown={this.handleCommandPromptKeyPress}
          />
        </Paper>
      </div>
    );
  }

}

export default ClientWindow;
