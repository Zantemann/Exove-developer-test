import React, { useState } from 'react';

// Slider with updated value in state
// Showing last value when released (another option is using timeout, but chose a simpler implementation)
const Slider = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    setIsSliding(true);
  };

  const handleSliderRelease = () => {
    setIsSliding(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Slider</h1>
      <input
        type="range"
        min={-10}
        max={10}
        value={sliderValue}
        onChange={handleSliderChange}
        onMouseUp={handleSliderRelease}
        onTouchEnd={handleSliderRelease}
      />
      <p>Slider Value: {sliderValue}</p>
      {!isSliding && (
        <p>Slider stopped: {sliderValue}</p>
      )}
    </div>
  );
};

export default Slider;