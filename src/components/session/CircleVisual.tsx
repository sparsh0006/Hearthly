import React, { useRef, useEffect } from 'react';
import { SessionStatus } from '../../types';

interface CircleVisualProps {
  status: SessionStatus;
  isDarkMode?: boolean;
}

const CircleVisual: React.FC<CircleVisualProps> = ({ status, isDarkMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 3;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw a basic circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = isDarkMode ? '#333333' : '#FFD700';
    ctx.fill();
    
    // Add a soft glow effect
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.9,
      centerX, centerY, radius * 1.2
    );
    
    if (isDarkMode) {
      gradient.addColorStop(0, 'rgba(60, 60, 60, 0.3)');
      gradient.addColorStop(1, 'rgba(30, 30, 30, 0)');
    } else {
      gradient.addColorStop(0, 'rgba(255, 230, 100, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    }
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.1, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
  }, [status, isDarkMode]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={300} 
      className="rounded-full"
    />
  );
};

export default CircleVisual;