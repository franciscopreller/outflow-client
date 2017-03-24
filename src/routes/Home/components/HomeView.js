import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { indigo500 } from 'material-ui/styles/colors';

const tabLabel = (title, index, closeSession) => (
  <div>
    <span style={{float: 'left'}}>{title}</span>
    <CloseIcon
      color="white"
      hoverColor={indigo500}
      style={{float: 'right', height: '16px', width: '16px', marginLeft: '10px'}}
      onTouchTap={() => closeSession(index)}
    />
  </div>
);

export const HomeView = ({ sessions, closeSession }) => (
  <div>
    <Tabs>
      {sessions.map((conn, index) => (
        <Tab key={`tab__${index}`} label={tabLabel(conn.name, index, closeSession)}>
          <span>{conn.host}:{conn.port}</span>
        </Tab>
      ))}
    </Tabs>
  </div>
);

export default HomeView;
