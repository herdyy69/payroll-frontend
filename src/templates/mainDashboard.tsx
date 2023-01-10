/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable new-cap */
import React, { useEffect } from 'react';

import Footer from './footer';
import NavbarDashboard from './navDashboard';

type MainProps = {
  children: ReactNode;
};

const MainDashboard = (props: MainProps) => {
  return (
    <div className="antialiased text-gray-800">
      <NavbarDashboard />
      <div className="mx-auto ">{props.children}</div>
      <Footer />
    </div>
  );
};

export { MainDashboard };
