import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { indigo500 } from 'material-ui/styles/colors';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ClientWindow from '../ClientWindow';

export class Dashboard extends React.Component {
  static propTypes = {
    sessions: React.PropTypes.array,
    closeSession: React.PropTypes.func,
    sessionConnect: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      sessions: props.sessions
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sessions: Object.assign([], nextProps.sessions)
    });
  }

  closeSession(uuid) {
    return () => {
      this.props.closeSession(uuid);
    };
  }

  getTabLabel(session) {
    return (
      <div>
        <span style={{float: 'left'}}>{session.name}</span>
        <CloseIcon
          color="white"
          hoverColor={indigo500}
          style={{float: 'right', height: '16px', width: '16px', marginLeft: '10px'}}
          onTouchTap={this.closeSession(session.uuid)}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Tabs>
          {this.state.sessions.map((session, index) => (
            <Tab key={`tab__${index}`} label={this.getTabLabel(session)}>
              <ClientWindow
                uuid={session.uuid}
                sendCommand={this.props.processCommand}
                contentSegments={session.content.segments}
                hideCommandLine={session.hidePrompt}
                commandHistory={session.command.history}
                connection={session.connection}
                reconnectSession={this.props.sessionConnect}
              />
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
