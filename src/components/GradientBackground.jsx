import React from 'react';
import './GradientBackground.css'; // Import CSS for gradient and animations

const GradientBackground = ({ children }) => {
  return (
    <div className="gradient-background">
      <div className="shapes-animation"></div>
      {children}
    </div>
  );
};

export default GradientBackground;
