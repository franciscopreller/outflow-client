import React from 'react';
import Paper from 'material-ui/Paper';
import './ClientWindow.scss';

export class ClientWindow extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      commandValue: '',
      commandRows: 1,
    };

    // Bindings
    this.focusOnCommandPrompt = this.focusOnCommandPrompt.bind(this);
    this.handleCommandPromptChange = this.handleCommandPromptChange.bind(this);
    this.handleCommandPromptKeyPress = this.handleCommandPromptKeyPress.bind(this);
  }

  focusOnCommandPrompt() {
    this.refs.prompt.focus();
  }

  handleCommandPromptChange(e) {
    this.setState({
      commandValue: e.target.value,
    });
  }

  handleCommandPromptKeyPress(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.setState({
        commandValue: '',
        commandRows: 1,
      });
    } else if (e.keyCode === 13 && e.shiftKey) {
      this.setState({
        commandRows: this.state.commandRows + 1,
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
            rows={this.state.commandRows}
            value={this.state.commandValue}
            onChange={this.handleCommandPromptChange}
            onKeyDown={this.handleCommandPromptKeyPress}
          />
        </Paper>
      </div>
    );
  }

}

export default ClientWindow;
