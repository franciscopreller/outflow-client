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
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      lines: props.contentLines,
    };

    // Bindings
    this.focusOnCommandPrompt = this.focusOnCommandPrompt.bind(this);
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

  shouldComponentUpdate(nextProps) {
    switch (true) {
      case (nextProps.contentLines.length !== this.state.lines.length):
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

  render() {
    return (
      <div>
        <Paper zDepth={2} className="client-window">
          <Paper className="client-content" onTouchTap={this.focusOnCommandPrompt}>
            {this.state.lines.map((line, index) => (
              <div style={{height: '16px'}} dangerouslySetInnerHTML={{__html: line}} key={`cwl__${index}`}/>
            ))}
            <div style={{float: 'left', clear: 'both'}} ref={el => { this.contentEndEl = el; }} />
          </Paper>
          <CommandLine sendCommand={this.props.sendCommand} uuid={this.props.uuid} />
        </Paper>
      </div>
    );
  }

}

export default ClientWindow;
