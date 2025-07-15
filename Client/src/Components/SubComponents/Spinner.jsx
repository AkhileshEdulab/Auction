import React from 'react';
import { HashLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <HashLoader size={60} color="#dc2626" loading={true} />
    </div>
  );
};

export default Spinner;
