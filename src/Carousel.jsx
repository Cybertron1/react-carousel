import React, { useState, useMemo, useCallback } from 'react';
import useSwipe from './useSwipe';
import PropTypes from 'prop-types';


const createActiveChildren = (children, showIndex, hideIndex) => {
  return children.map((child, i) => {
    let className = 'carousel-item';
    if (i === showIndex) {
      className = `${className} show ${initLoad ? 'no-animation' : ''}`;
    } else if (i === hideIndex) {
      className = `${className}  hide`;
    }
    return <div className={className} key={i}>{child}</div>;
  });
};

let initLoad = true;

const Carousel = ({ children, leftButton, rightButton, ...props }) => {
  const max = children.length - 1;
  const [status, setStatus] = useState({ active: 0, hide: max, className: 'show-right', animating: false });
  const swiped = useSwipe(() => left(), () => right(), 100);

  const onButtonClick = (active, className) => {
    setStatus(status => {
      return {
        ...status,
        active,
        className,
        animating: true
      }
    });
  };

  const left = useCallback(() => {
    const active = status.active === 0 ? max : status.active - 1;
    onButtonClick(active, 'show-left');
    initLoad = false;
  }, [max, status.active]);

  const right = useCallback(() => {
    const active = status.active === max ? 0 : status.active + 1;
    onButtonClick(active, 'show-right');
    initLoad = false;
  }, [max, status.active]);

  const disableDisable = () => {
    setStatus(status => {
      return {
        ...status,
        animating: false
      }
    });
  };

  const leftBtn = useMemo(() => {
    return React.cloneElement(leftButton, { onClick: left, className: 'button', disabled: status.animating }, null)
  }, [left, leftButton, status.animating]);

  const rightBtn = useMemo(() => {
    return React.cloneElement(rightButton, { onClick: right, className: 'button', disabled: status.animating }, null)
  }, [right, rightButton, status.animating]);

  return <div className="carousel" {...props} {...swiped}>
    <div className='left-button'>
      {leftBtn}
    </div>
    <div className={`items ${status.className}`} onAnimationEnd={disableDisable}>
      {createActiveChildren(children, status.active, status.hide)}
    </div>
    <div className='right-button'>
      {rightBtn}
    </div>
  </div>;
};

Carousel.defaultProps = {
  leftButton: (<button>left</button>),
  rightButton: (<button>right</button>)
};

Carousel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  leftButton: PropTypes.element,
  rightButton: PropTypes.element
};

export default Carousel;
