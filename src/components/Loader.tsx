import React from 'react';
import './Loader.css';
import { Loader as LoaderIcon } from 'lucide-react';
const Loader: React.FC = () => {
  return (
    <div className="loader-container flex items-center justify-center">
      <LoaderIcon className="loader-icon" size={48} />
    </div>
  );
};

export default Loader;
