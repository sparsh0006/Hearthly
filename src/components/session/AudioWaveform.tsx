import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isListening: boolean;
  isDarkMode?: boolean;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  isListening,
  isDarkMode = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!isListening) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 50;
    canvas.height = 40;
    
    const bars = 20;
    const barWidth = canvas.width / bars - 2;
    
    let animationFrameId: number;
    let frameCount = 0;
    const frameDelay = 1;// Higher value = slower movement (adjust this to control speed)
    
    // Store the current bar heights
    const barHeights = Array(bars).fill(0).map(() => Math.random() * 60 + 5);
    // Target heights that bars will gradually move toward
    const targetHeights = Array(bars).fill(0).map(() => Math.random() * 30 + 5);
    
    const renderFrame = () => {
      frameCount++;
      
      // Only update target heights occasionally to create slower overall movement
      if (frameCount % (frameDelay * 5) === 0) {
        for (let i = 0; i < bars; i++) {
          targetHeights[i] = Math.random() * 30 + 5;
        }
      }
      
      // Only redraw and update heights based on frame delay
      if (frameCount % frameDelay === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < bars; i++) {
          // Gradually move current height toward target height (easing)
          barHeights[i] += (targetHeights[i] - barHeights[i]) * 0.05;
          
          ctx.fillStyle = isDarkMode ? '#555555' : '#000000';
          ctx.fillRect(
            i * (barWidth + 2), 
            (canvas.height - barHeights[i]) / 2, 
            barWidth, 
            barHeights[i]
          );
        }
      }
      
      animationFrameId = requestAnimationFrame(renderFrame);
    };
    
    renderFrame();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isListening, isDarkMode]);
  
  if (!isListening) return null;
  
  return (
    <div className="flex justify-center mt-4 mb-8">
      <canvas ref={canvasRef} height={40} className="rounded" />
    </div>
  );
};

export default AudioWaveform;