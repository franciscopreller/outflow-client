import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { indigo500 } from 'material-ui/styles/colors';
import ClientWindow from '../../../components/ClientWindow';

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

export const HomeView = ({ connections, content, closeSession }) => (
  <div>
    <Tabs>
      {connections.map((conn, index) => (
        <Tab key={`tab__${index}`} label={tabLabel(conn.name, index, closeSession)}>
          <ClientWindow uuid={conn.uuid}>
            {content.find(c => c.uuid === conn.uuid).lines.map((line, index) => (
              <div style={{ height: '16px' }} dangerouslySetInnerHTML={{ __html: line }} key={`cwl__${index}`} />
            ))}
          </ClientWindow>
        </Tab>
      ))}
    </Tabs>
  </div>
);

export default HomeView;
