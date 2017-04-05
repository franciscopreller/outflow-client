import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import CommandLine from '../CommandLine/CommandLine';
import * as SessionUtils from '../../modules/session/utils';
import './ClientWindow.scss';

export class ClientWindow extends React.Component {
  static propTypes = {
    contentSegments: React.PropTypes.array,
    sendCommand: React.PropTypes.func,
    uuid: React.PropTypes.string,
    hideCommandLine: React.PropTypes.bool,
    commandHistory: React.PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      segments: props.contentSegments,
      shouldScroll: true,
      hideCommandLine: props.hideCommandLine,
      commandHistory: props.commandHistory,
    };
  }

  componentDidMount() {
    setTimeout(this.scrollToBottomOfContent.bind(this), 10);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      segments: nextProps.contentSegments,
      hideCommandLine: nextProps.hideCommandLine,
      commandHistory: nextProps.commandHistory,
    });
  }

  shouldComponentUpdate(nextProps) {
    const linesLength = nextProps.contentSegments.length;
    switch (true) {
      case (linesLength !== this.state.segments.length):
      case (nextProps.contentSegments[linesLength - 1].length !== this.state.segments[this.state.segments.length - 1]):
      case (nextProps.hideCommandLine !== this.state.hideCommandLine):
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

  segmentShouldEndWithNewLine(content, segment, index, lastIndex) {
    const lastCharIsNewLine = /\r?\n/.test(segment.text[segment.text.length - 1]);
    return (lastCharIsNewLine || (index !== lastIndex));
  }

  render() {
    return (
      <div>
        <Paper zDepth={2} className="client-window">
          <Paper className="client-content" onTouchTap={this.focusOnCommandPrompt()} onScroll={this.handleScroll()}>
            {this.state.segments.map((segment) => {
              let props = {};
              if (segment.classes) {
                props.className = segment.classes.join(' ');
              }
              const newLinesArray = segment.text.split(/\r?\n/);
              const lastIndex = newLinesArray.length - 1;
              return newLinesArray.map((c, i, s) => (
                <span {...props} dangerouslySetInnerHTML={{
                  __html: `${SessionUtils.escapeForHtml(c)}${(this.segmentShouldEndWithNewLine(c, segment, i, lastIndex)) ? '<br />' : ''}`
                }}/>
              ));
            })}
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
