import React from 'react';

// Slider is arrow function which takes one object with properties
const Buttons = ({ id, className, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className='button'>
      <button id={id} className={className} onClick={handleClick} />
    </div>
  );
};

export default Buttons;
