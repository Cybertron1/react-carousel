import { useState } from 'react';

const useSwipe = (left, right, length) => {
  const [touches, setTouches] = useState([]);
  const handle = () => {
    if (touches[0] - touches[touches.length - 1] > length) {
      right();
    } else if (touches[0] - touches[touches.length - 1] < -length) {
      left();
    }
    setTouches([]);
  };
  return {
    onTouchStart: (e) => setTouches([...touches, e.touches[0].clientX]),
    onTouchMove: (e) => setTouches([...touches, e.touches[0].clientX]),
    onTouchEnd: handle
  }
};

export default useSwipe;
