import React from 'react';
import Carousel from '@glytch/react-carousel';
import './style.scss';
import '@glytch/react-carousel/dist/bundle.css';

const App = () => {
  return <Carousel leftButton={(<button>hi</button>)}>
    <div className='thingy'>Hi</div>
    <div className='thingy'>test</div>
    <div className='thingy'>test</div>
  </Carousel>
};


export default App;
