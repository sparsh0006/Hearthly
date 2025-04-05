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
    
    canvas.width = 400;
    canvas.height = 40;
    
    const bars = 40;
    const barWidth = canvas.width / bars - 2;
    
    let animationFrameId: number;
    
    const renderFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < bars; i++) {
        const height = isListening ? Math.random() * 30 + 5 : 5;
        
        ctx.fillStyle = isDarkMode ? '#555555' : '#E5E5E5';
        ctx.fillRect(
          i * (barWidth + 2), 
          (canvas.height - height) / 2, 
          barWidth, 
          height
        );
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