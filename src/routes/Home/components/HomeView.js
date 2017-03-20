import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import './HomeView.scss';

export const HomeView = ({ connections }) => (
  <div>
    <Tabs>
      {connections.map(conn => {
        return (
          <Tab label={conn.name} style={{maxWidth: '200px'}}>
            <span>{conn.host}:{conn.port}</span>
          </Tab>
        );
      })}
    </Tabs>
  </div>
);

export default HomeView;
