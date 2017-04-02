import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import CommandLine from './CommandLine';
import './ClientWindow.scss';

export class ClientWindow extends React.Component {
  static propTypes = {
    contentLines: React.PropTypes.array,
    sendCommand: React.PropTypes.func,
    uuid: React.PropTypes.string,
    hideCommandLine: React.PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      lines: props.contentLines,
      shouldScroll: true,
      hideCommandLine: props.hideCommandLine,
    };
  }

  componentDidMount() {
    setTimeout(this.scrollToBottomOfContent.bind(this), 10);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      lines: nextProps.contentLines,
      hideCommandLine: nextProps.hideCommandLine,
    });
  }

  shouldComponentUpdate(nextProps) {
    switch (true) {
      case (nextProps.contentLines.length !== this.state.lines.length):
      case (nextProps.hideCommandLine !== this.state.hideCommandLine):
        return true;
      default:
        return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.shouldScroll && prevState.lines !== this.state.lines) {
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

  render() {
    return (
      <div>
        <Paper zDepth={2} className="client-window">
          <Paper className="client-content" onTouchTap={this.focusOnCommandPrompt()} onScroll={this.handleScroll()}>
            {this.state.lines.map((line, index) => (
              <div style={{height: '16px'}} dangerouslySetInnerHTML={{__html: line}} key={`cwl__${index}`} />
            ))}
            <div style={{float: 'left', clear: 'both'}} ref={el => { this.contentEndEl = el; }} />
          </Paper>
          <CommandLine
            ref="prompt"
            sendCommand={this.props.sendCommand}
            uuid={this.props.uuid}
            hide={this.state.hideCommandLine}
          />
        </Paper>
      </div>
    );
  }

}

export default ClientWindow;
