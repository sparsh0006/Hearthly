import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface AnimatedWaveProps {
  className?: string;
  height?: number;
  width?: number;
  color?: string;
}

const AnimatedWave: React.FC<AnimatedWaveProps> = ({ 
  className = '', 
  height = 200, 
  width = 1200,
  color = '#B2A4FF'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Set background for the canvas in dark mode
    if (isDarkMode) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    let time = 0;
    let animationFrameId: number;
    
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Re-apply background in dark mode
      if (isDarkMode) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Draw waves
      ctx.fillStyle = color;
      
      // First wave
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.01 + time) * 20 + 
                 Math.sin(x * 0.02 + time * 1.5) * 15 + 
                 height / 2;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      
      // Second wave (slightly different speed and amplitude)
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.008 - time * 0.8) * 25 + 
                 Math.sin(x * 0.015 - time * 1.2) * 12 + 
                 height / 2 + 15;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      
      // Update and continue animation
      time += 0.01;
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, width, color, isDarkMode]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`block ${className}`}
      style={{ 
        maxWidth: '100%',
        display: 'block',
        backgroundColor: isDarkMode ? '#000000' : 'transparent'
      }}
    />
  );
};

export default AnimatedWave;