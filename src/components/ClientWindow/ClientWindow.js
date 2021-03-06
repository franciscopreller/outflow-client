import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import ReconnectIcon from 'material-ui/svg-icons/navigation/refresh';
import { grey500 } from 'material-ui/styles/colors';
import CommandLine from '../CommandLine/CommandLine';
import * as SessionUtils from '../../modules/session/utils';
import './ClientWindow.scss';

export class ClientWindow extends React.Component {
  static propTypes = {
    contentSegments: React.PropTypes.array,
    promptSegments: React.PropTypes.array,
    sendCommand: React.PropTypes.func,
    uuid: React.PropTypes.string,
    hideCommandLine: React.PropTypes.bool,
    commandHistory: React.PropTypes.array,
    connection: React.PropTypes.object,
    reconnectSession: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      segments: props.contentSegments,
      promptSegments: props.promptSegments,
      shouldScroll: true,
      hideCommandLine: props.hideCommandLine,
      commandHistory: props.commandHistory,
      connected: props.connection.connected,
      connecting: props.connection.connecting,
    };
  }

  componentDidMount() {
    setTimeout(this.scrollToBottomOfContent.bind(this), 10);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      segments: nextProps.contentSegments,
      promptSegments: nextProps.promptSegments,
      hideCommandLine: nextProps.hideCommandLine,
      commandHistory: nextProps.commandHistory,
      connected: nextProps.connection.connected,
      connecting: nextProps.connection.connecting,
    });
  }

  shouldComponentUpdate(nextProps) {
    const linesLength = nextProps.contentSegments.length;
    const promptLength = nextProps.promptSegments.length;
    switch (true) {
      case (linesLength !== this.state.segments.length):
      case (nextProps.contentSegments[linesLength - 1].length !== this.state.segments[this.state.segments.length - 1]):
      case (promptLength !== this.state.promptSegments.length):
      case (nextProps.hideCommandLine !== this.state.hideCommandLine):
      case (nextProps.connection !== this.state.connection):
        return true;
      default:
        return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.shouldScroll && prevState.segments !== this.state.segments) {
      this.scrollToBottomOfContent();
    }
  }

  scrollToBottomOfContent() {
    const node = ReactDOM.findDOMNode(this.contentEndEl);
    node.scrollIntoView();
  }

  focusOnCommandPrompt() {
    return () => this.refs.prompt.focus();
  }

  handleScroll() {
    return (e) => {
      const { scrollTop, scrollHeight, offsetHeight } = e.target;
      const shouldScroll = ((scrollTop + 1) >= scrollHeight - offsetHeight);
      this.setState({ shouldScroll });
    }
  }

  reconnectSession() {
    return () => {
      this.props.reconnectSession(this.props.connection);
    }
  }

  mapSegments(segments) {
    return segments.map((segment, key) => {
      let props = {};
      if (segment.classes) {
        props.className = segment.classes.join(' ');
      }
      return (
        <span key={`c__${key}`} {...props} dangerouslySetInnerHTML={{
          __html: SessionUtils.escapeForHtml(segment.text),
        }} />
      );
    });
  }

  renderOverlay() {
    const innerOverlayStyle = {};
    if (!this.state.connected && !this.state.connecting) {
      innerOverlayStyle.cursor = 'pointer';
    }
    const iconProps = { style: { height: '120px', width: '120px' }, color: grey500, hoverColor: 'white' };
    if (!this.state.connected && this.state.connecting) {
      iconProps.className = 'spin';
    } else {
      iconProps.onTouchTap = this.reconnectSession();
    }

    return (
      <div className="client-overlay">
        <div className="client-overlay-inner" style={innerOverlayStyle}>
          <ReconnectIcon {...iconProps} />
          <div>{(this.state.connecting) ? 'Connecting...' : 'Reconnect'}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Paper zDepth={2} className="client-window">
          {!this.state.connected && this.renderOverlay()}
          <Paper className="client-content" onTouchTap={this.focusOnCommandPrompt()} onScroll={this.handleScroll()}>
            {this.mapSegments(this.state.segments)}
            <div>{this.mapSegments(this.state.promptSegments)}</div>
            <div style={{float: 'left', clear: 'both'}} ref={el => { this.contentEndEl = el; }} />
          </Paper>
          <CommandLine
            ref="prompt"
            sendCommand={this.props.sendCommand}
            uuid={this.props.uuid}
            history={this.state.commandHistory}
            hide={this.state.hideCommandLine}
          />
        </Paper>
      </div>
    );
  }

}

export default ClientWindow;
