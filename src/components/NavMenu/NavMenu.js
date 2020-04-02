import React, { useState } from 'react';

import SmallNavBar from './SmallNavMenu';
import LeftNavMenu from './LeftNavMenu';

const NavMenu = () => {
  const [isNavExpanded, setNavExpanded] = useState(false);

  const toggleNavMenu = () => {
    setNavExpanded(!isNavExpanded);
  }

  return (
    <>
      <SmallNavBar toggleNavMenuCallback={toggleNavMenu} />
      <LeftNavMenu isNavExpanded={isNavExpanded} />
    </>
  )
}

export default NavMenu;
