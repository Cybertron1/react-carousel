import React from 'react';
import Carousel from '@cyber/react-carousel';
import './style.scss';

const App = () => {
  return <Carousel leftButton={(<button>hi</button>)}>
    <div className='thingy'>Hi</div>
    <div className='thingy'>test</div>
  </Carousel>
};


export default App;
