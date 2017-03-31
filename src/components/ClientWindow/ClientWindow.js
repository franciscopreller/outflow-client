import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import * as keyCodes from './keyCodes';
import './ClientWindow.scss';

export class ClientWindow extends React.Component {
  static propTypes = {
    contentLines: React.PropTypes.array,
    sendCommand: React.PropTypes.func,
    uuid: React.PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      command: '',
      rows: 1,
      lines: props.contentLines,
    };

    // Bindings
    this.focusOnCommandPrompt = this.focusOnCommandPrompt.bind(this);
    this.handleCommandPromptChange = this.handleCommandPromptChange.bind(this);
    this.handleCommandPromptKeyPress = this.handleCommandPromptKeyPress.bind(this);
    this.handleDeleteKeyPress = this.handleDeleteKeyPress.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.resetPrompt = this.resetPrompt.bind(this);
    this.scrollToBottomOfContent = this.scrollToBottomOfContent.bind(this);
  }

  componentDidMount() {
    setTimeout(this.scrollToBottomOfContent, 10);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contentLines) {
      this.setState({
        lines: nextProps.contentLines,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    switch (true) {
      case (nextProps.contentLines.length !== this.state.lines.length):
      case (nextState.command !== this.state.command):
      case (nextState.rows !== this.state.rows):
        return true;
      default:
        return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lines !== this.state.lines) {
      this.scrollToBottomOfContent();
    }
  }

  scrollToBottomOfContent() {
    const node = ReactDOM.findDOMNode(this.contentEndEl);
    node.scrollIntoView();
  }

  focusOnCommandPrompt() {
    this.refs.prompt.focus();
  }

  resetPrompt() {
    this.setState({
      command: '',
      rows: 1,
    });
  }

  sendCommand(command) {
    this.props.sendCommand(command, this.props.uuid);
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
    return (
      <div className="client-window-wrapper">
        <Paper zDepth={2} className="client-window">
          <Paper className="client-content" onTouchTap={this.focusOnCommandPrompt}>
            {this.state.lines.map((line, index) => (
              <div style={{height: '16px'}} dangerouslySetInnerHTML={{__html: line}} key={`cwl__${index}`}/>
            ))}
            <div style={{float: 'left', clear: 'both'}} ref={(el) => {
              this.contentEndEl = el;
            }}></div>
          </Paper>
          <textarea
            ref="prompt"
            className="client-command-line"
            rows={this.state.rows}
            value={this.state.command}
            onChange={this.handleCommandPromptChange}
            onKeyDown={this.handleCommandPromptKeyPress}
            onKeyUp={this.handleDeleteKeyPress}
          />
        </Paper>
      </div>
    );
  }

}

export default ClientWindow;
