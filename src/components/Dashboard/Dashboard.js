import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { indigo500 } from 'material-ui/styles/colors';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ClientWindow from '../ClientWindow';

const tabLabel = (title, uuid, closeSession) => (
  <div>
    <span style={{float: 'left'}}>{title}</span>
    <CloseIcon
      color="white"
      hoverColor={indigo500}
      style={{float: 'right', height: '16px', width: '16px', marginLeft: '10px'}}
      onTouchTap={() => closeSession(uuid)}
    />
  </div>
);

export const Dashboard = ({ connections, content, closeSession, sendCommand }) => {
  return (
    <div>
      <Tabs>
        {connections.map((conn, index) => (
          <Tab key={`tab__${index}`} label={tabLabel(conn.name, conn.uuid, closeSession)}>
            <ClientWindow
              uuid={conn.uuid}
              sendCommand={sendCommand}
              contentLines={content.find(c => c.uuid === conn.uuid).lines}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Dashboard;
