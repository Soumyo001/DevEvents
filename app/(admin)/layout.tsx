import React from 'react';
import NavBar from "@/components/navbar";
import { ADMINNAVBARITEM } from "@/lib/data/constants";

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full flex flex-col'>
      <NavBar
        items={ADMINNAVBARITEM}
      />
      <div
          className='container mx-auto mt-20 sm:px-10 px-5 py-10'
      >
          {children}
      </div>
    </div>
  );
}

export default Layout