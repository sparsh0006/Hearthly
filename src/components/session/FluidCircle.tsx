import React, { useRef, useEffect } from 'react';
import { SessionStatus } from '../../types';
import { generateFluidCirclePoints } from '../../utils/animation';
import { normalizeAudioData, getFrequencyBands } from '../../utils/audio';

interface FluidCircleProps {
  status: SessionStatus;
  audioData?: number[];
}

const FluidCircle: React.FC<FluidCircleProps> = ({ status, audioData = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const isDarkMode = status === 'processing' || status === 'responding';
    const circleColor = isDarkMode ? '#333333' : '#FFD700';
    
    canvas.width = 300;
    canvas.height = 300;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = 120;
    
    let animationFrameId: number;
    let time = 0;
    
    const drawFluidCircle = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (status === 'idle') {
        // Draw simple circle for idle state
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = circleColor;
        ctx.fill();
      } else {
        // Get audio intensity for variations
        let intensity = 0.2; // default
        
        if (audioData && audioData.length > 0 && status === 'listening') {
          const normalizedAudio = normalizeAudioData(audioData);
          const bands = getFrequencyBands(normalizedAudio);
          intensity = Math.max(...bands) * 0.5 + 0.2; // scale to reasonable range
        } else if (status === 'processing' || status === 'responding') {
          // Subtle movement for processing/responding states
          intensity = 0.1 + Math.sin(time * 0.5) * 0.05;
        }
        
        // Draw fluid circle with variation based on status and audio
        const points = generateFluidCirclePoints(
          centerX,
          centerY,
          baseRadius,
          40,
          intensity,
          time
        );
        
        // Fill the fluid circle
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
          const curr = points[i];
          const prev = points[i - 1];
          
          // Use quadratic curves for smoother shape
          const cp = {
            x: (prev.x + curr.x) / 2,
            y: (prev.y + curr.y) / 2
          };
          
          ctx.quadraticCurveTo(prev.x, prev.y, cp.x, cp.y);
        }
        
        // Connect back to the first point
        const last = points[points.length - 1];
        const first = points[0];
        const cp = {
          x: (last.x + first.x) / 2,
          y: (last.y + first.y) / 2
        };
        ctx.quadraticCurveTo(last.x, last.y, cp.x, cp.y);
        
        ctx.fillStyle = circleColor;
        ctx.fill();
        
        // Add inner glow/gradient for more depth
        const gradient = ctx.createRadialGradient(
          centerX, centerY, baseRadius * 0.5,
          centerX, centerY, baseRadius * 1.2
        );
        
        if (isDarkMode) {
          gradient.addColorStop(0, 'rgba(80, 80, 80, 0.4)');
          gradient.addColorStop(1, 'rgba(30, 30, 30, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(255, 230, 100, 0.4)');
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      time += 0.03;
      animationFrameId = requestAnimationFrame(drawFluidCircle);
    };
    
    drawFluidCircle();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [status, audioData]);
  
  return (
    <div className="flex justify-center my-10">
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={300} 
        className="rounded-full"
      />
    </div>
  );
};

export default FluidCircle;