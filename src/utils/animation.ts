/**
 * Simple easing function for animations
 * @param t Current time
 * @param b Start value
 * @param c Change in value
 * @param d Duration
 */
export const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };
  
  /**
   * Create a fluid-like noise value
   * @param x X coordinate
   * @param y Y coordinate
   * @param time Current time value
   */
  export const fluidNoise = (x: number, y: number, time: number): number => {
    const noise1 = Math.sin(x * 0.1 + time * 0.2) * Math.cos(y * 0.1 + time * 0.3);
    const noise2 = Math.sin(x * 0.02 + time * 0.7) * Math.cos(y * 0.02 + time * 0.1);
    
    return (noise1 + noise2) * 0.5 + 0.5; // Normalize to 0-1
  };
  
  /**
   * Generate points for a fluid-like circle
   * @param centerX Center X coordinate
   * @param centerY Center Y coordinate
   * @param radius Base radius
   * @param points Number of points
   * @param variation Amount of radius variation
   * @param time Current time value
   */
  export const generateFluidCirclePoints = (
    centerX: number, 
    centerY: number, 
    radius: number,
    points: number = 40,
    variation: number = 0.2,
    time: number = 0
  ): {x: number, y: number}[] => {
    const result = [];
    
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const noise = fluidNoise(Math.cos(angle) * 10, Math.sin(angle) * 10, time);
      const radiusOffset = radius * variation * noise;
      const currentRadius = radius + radiusOffset;
      
      result.push({
        x: centerX + Math.cos(angle) * currentRadius,
        y: centerY + Math.sin(angle) * currentRadius
      });
    }
    
    return result;
  };