import { motion } from "framer-motion";
import React, { useState } from "react";

interface CloudyCircleProps {
  isActive?: boolean; // Whether it's responding (faster animation) or idle/listening
}

const CloudyCircle: React.FC<CloudyCircleProps> = ({ isActive = false }) => {
  // Use more particles for denser clouds
  const particleCount = 8;
  const particles = Array.from({ length: particleCount });
  
  // Animation speeds based on state
  const baseSpeed = isActive ? 2 : 4; // Faster when active (responding)
  const baseDuration = isActive ? 2.5 : 5;
  
  // Create more complex and varied blob shapes for a natural cloud effect
  const generateBlobPath = (index: number) => {
    const randomOffset = () => Math.random() * 10 - 5;
    const center = 50 + randomOffset();
    const radius = 20 + (index % 3) * 5;
    
    // Create more control points for complex shapes
    let path = `M${center - radius} ${center}`;
    
    // Add 6-8 control points for more organic shapes
    const points = 6 + Math.floor(Math.random() * 3);
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const nextAngle = ((i + 1) / points) * Math.PI * 2;
      
      const r1 = radius * (0.8 + Math.random() * 0.4);
      const r2 = radius * (0.8 + Math.random() * 0.4);
      
      const cx1 = center + r1 * Math.cos(angle) + randomOffset();
      const cy1 = center + r1 * Math.sin(angle) + randomOffset();
      
      const cx2 = center + r2 * Math.cos(nextAngle) + randomOffset();
      const cy2 = center + r2 * Math.sin(nextAngle) + randomOffset();
      
      path += ` Q${cx1} ${cy1} ${cx2} ${cy2}`;
    }
    
    path += " Z";
    return path;
  };
  
  // Animation variants with more dynamic movement
  const blobVariants = {
    animate: (i: number) => ({
      // More complex transformations for a swirling, windy effect
      x: [0, 5, -5, 3, -2, 0],
      y: [0, -3, 4, -4, 2, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
      rotate: [0, 10, -5, 8, 0],
      opacity: [0.4, 0.7, 0.5, 0.65, 0.4],
      filter: ["blur(3px)", "blur(4px)", "blur(2px)", "blur(3px)"],
      transition: {
        duration: baseDuration + (i % 3), 
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.7, 1],
        // Faster transitions create the wind-like effect
        type: "tween",
      },
    }),
  };

  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        background: "#222", // Darker background
      }}
    >
      {/* Background gradient for depth */}
      <div 
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle, rgba(100,100,100,0.3) 0%, rgba(50,50,50,0.2) 70%, rgba(30,30,30,0.1) 100%)",
        }}
      />
      
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          {/* Multiple gradients for varied cloud colors */}
          <radialGradient id="cloudGradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "#aaa", stopOpacity: 0.7 }} />
            <stop offset="100%" style={{ stopColor: "#444", stopOpacity: 0.4 }} />
          </radialGradient>
          
          <radialGradient id="cloudGradient2" cx="40%" cy="60%" r="60%">
            <stop offset="0%" style={{ stopColor: "#999", stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: "#333", stopOpacity: 0.3 }} />
          </radialGradient>
          
          <filter id="cloudBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Generate multiple cloud blobs with varied paths */}
        {particles.map((_, i) => (
          <motion.path
            key={i}
            d={generateBlobPath(i)}
            fill={i % 2 === 0 ? "url(#cloudGradient1)" : "url(#cloudGradient2)"}
            filter="url(#cloudBlur)"
            custom={i}
            variants={blobVariants}
            animate="animate"
            style={{ 
              mixBlendMode: "soft-light", 
              transformOrigin: "center",
            }}
          />
        ))}

        {/* Extra overlay layer for texture */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            transition: {
              duration: baseSpeed,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }
          }}
        />
      </motion.svg>
    </div>
  );
};

export default CloudyCircle;