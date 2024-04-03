import React from 'react';
import SiteHeader from './Header';
const Header =( props) => {
  return (
          <SiteHeader nav={props.nav} hide={props.hide}/>
  );
};
export default Header