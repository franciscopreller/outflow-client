import React from 'react';
import * as keyCodes from './keyCodes';
import './CommandLine.scss';

export class CommandLine extends React.Component {
  static PropTypes = {
    hide: React.PropTypes.bool,
    sendCommand: React.PropTypes.func,
    uuid: React.PropTypes.string,
    history: React.PropTypes.history,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      command: '',
      rows: 1,
      hide: false,
      commandHistoryPointer: -1,
      history: props.history,
      maxHistoryIndex: props.history.length - 1,
    };

    // Bindings
    this.handleCommandPromptChange = this.handleCommandPromptChange.bind(this);
    this.handleCommandPromptKeyPress = this.handleCommandPromptKeyPress.bind(this);
    this.handleDeleteKeyPress = this.handleDeleteKeyPress.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.resetPrompt = this.resetPrompt.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log({
      hide: nextProps.hide,
      history: nextProps.history,
      maxHistoryIndex: (nextProps.history.length - 1),
    });
    this.setState({
      hide: nextProps.hide,
      history: nextProps.history,
      maxHistoryIndex: (nextProps.history.length - 1),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    switch (true) {
      case (nextState.hide !== this.state.hide):
      case (nextState.command !== this.state.command):
      case (nextState.rows !== this.state.rows):
        return true;
      default:
        return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hide !== this.state.lines) {
      this.focus();
    }
  }

  focus() {
    this.refs.input.focus();
  }

  resetPrompt() {
    this.setState({
      command: '',
      rows: 1,
      commandHistoryPointer: -1,
    });
  }

  sendCommand(command) {
    this.props.sendCommand(command, this.props.uuid, this.state.hide);
  }

  handleCommandPromptChange(e) {
    this.setState({
      command: e.target.value,
    });
  }

  // Enter/New line commands should be treated with "key down"
  handleCommandPromptKeyPress(e) {
    switch (true) {
      // On 'Enter' submit and reset prompt
      case (e.keyCode === keyCodes.ENTER_KEY && !e.shiftKey):
        e.preventDefault();
        this.sendCommand(this.state.command);
        this.resetPrompt();
        break;
      // On 'Shift + Enter' allow multi line
      case (e.keyCode === keyCodes.ENTER_KEY && e.shiftKey):
        this.setState({
          rows: this.state.rows + 1,
        });
        break;
      case (e.keyCode === keyCodes.UP_ARROW_KEY):
        if (this.state.commandHistoryPointer < this.state.maxHistoryIndex) {
          const index = this.state.commandHistoryPointer + 1;
          this.setState({
            commandHistoryPointer: index,
            command: this.state.history[index],
          });
        }
        break;
      case (e.keyCode === keyCodes.DOWN_ARROW_KEY):
        if (this.state.commandHistoryPointer >= 0) {
          const index = this.state.commandHistoryPointer - 1;
          const command = (index === -1) ? '' : this.state.history[index];
          this.setState({
            commandHistoryPointer: index,
            command,
          });
        }
        break;
      default:
        break;
    }
  }

  // Other commands treated with "key up"
  handleDeleteKeyPress(e) {
    switch (true) {
      // On 'Backspace or Delete' count the remaining lines in command line and resize accordingly
      case (e.keyCode === keyCodes.BACKSPACE_KEY || e.keyCode === keyCodes.DELETE_KEY):
        this.setState({
          rows: this.state.command.split('\n').length,
        });
        break;
      // On 'Esc' reset prompt
      case (e.keyCode === keyCodes.ESC_KEY):
        this.resetPrompt();
        break;
      default:
        break;
    }
  }

  render() {
    const props = {
      ref: 'input',
      className: 'client-command-line',
      value: this.state.command,
      onChange: this.handleCommandPromptChange,
      onKeyDown: this.handleCommandPromptKeyPress,
      onKeyUp: this.handleDeleteKeyPress,
    };
    return (this.state.hide) ? <input type="password" {...props}/> : <textarea rows={this.state.rows} {...props} />;
  }

}

export default CommandLine;
