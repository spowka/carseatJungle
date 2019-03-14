import React from 'react';
import {ClipLoader} from 'react-spinners';

const Spinner = () => (
  <div
    style={{
      marginLeft: 'calc(50% - 30px)',
      marginTop: '40px',
      marginBottom: '40px',
    }}
  >
    <ClipLoader sizeUnit={'px'} size={60} color={'#45524F'} loading={true} />
  </div>
);

export default Spinner;
