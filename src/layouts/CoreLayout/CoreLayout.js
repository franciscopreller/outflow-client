import React from 'react';
import Header from '../../components/Header';
import './CoreLayout.scss';
import '../../styles/core.scss';
import { grey900, grey50 } from 'material-ui/styles/colors';

export const CoreLayout = ({ children }) => (
  <div className='container'>
    <Header />
    <div className='core-layout' style={{ background: grey900, color: grey50 }}>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
