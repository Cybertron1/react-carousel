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

const useButtonFunc = () => {

}

const useButton = (button, newProps) => {
  return useMemo(() => {
    return React.cloneElement(button, {
      ...newProps,
      className: 'button',
      ...button.props
    }, button.props.children);
  }, [newProps, button]);
};

let initLoad = true;

const Carousel = ({ children, leftButton, rightButton, ...props }) => {
  const max = children.length - 1;
  const [status, setStatus] = useState({ active: 0, hide: max, className: 'show-right', animating: false });
  const swiped = useSwipe(() => left(), () => right(), 100);
  const left = useCallback(() => {
    console.log("left");
    const active = status.active === 0 ? max : status.active - 1;
    onButtonClick(active, 'show-left');
    initLoad = false;
  }, [max, status.active]);

  const right = useCallback(() => {
    console.log('right');
    const active = status.active === max ? 0 : status.active + 1;
    onButtonClick(active, 'show-right');
    initLoad = false;
  }, [max, status.active]);

  const rightBtn = useButton(rightButton, { onClick: right, disabled: status.animating });
  const leftBtn = useButton(leftButton, { onClick: left, disabled: status.animating });

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

  const disableDisable = () => {
    setStatus(status => {
      return {
        ...status,
        animating: false
      }
    });
  };
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
  leftButton: (<button>{'<'}</button>),
  rightButton: (<button>{'>'}</button>)
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
