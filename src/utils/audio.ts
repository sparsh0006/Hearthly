// Utility functions for audio processing

/**
 * Normalizes audio data to a specific range
 * @param data The raw audio data
 * @param minOutput Minimum output value
 * @param maxOutput Maximum output value
 * @returns Normalized audio data
 */
export const normalizeAudioData = (
    data: number[], 
    minOutput: number = 0, 
    maxOutput: number = 1
  ): number[] => {
    if (data.length === 0) return [];
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    
    // Prevent division by zero
    if (max === min) return data.map(() => (maxOutput + minOutput) / 2);
    
    return data.map(val => {
      return minOutput + ((val - min) / (max - min)) * (maxOutput - minOutput);
    });
  };
  
  /**
   * Smooths audio data using a simple moving average
   * @param data The input audio data
   * @param windowSize The size of the moving average window
   * @returns Smoothed audio data
   */
  export const smoothAudioData = (data: number[], windowSize: number = 3): number[] => {
    const result = [];
    
    for (let i = 0; i < data.length; i++) {
      let sum = 0;
      let count = 0;
      
      for (let j = Math.max(0, i - Math.floor(windowSize / 2)); 
           j <= Math.min(data.length - 1, i + Math.floor(windowSize / 2)); 
           j++) {
        sum += data[j];
        count++;
      }
      
      result.push(sum / count);
    }
    
    return result;
  };
  
  /**
   * Gets dominant frequency bands from audio data
   * @param audioData The audio frequency data
   * @param bands Number of frequency bands to extract
   */
  export const getFrequencyBands = (audioData: number[], bands: number = 4): number[] => {
    const bandSize = Math.floor(audioData.length / bands);
    const result = [];
    
    for (let i = 0; i < bands; i++) {
      const start = i * bandSize;
      const end = start + bandSize;
      
      let sum = 0;
      for (let j = start; j < end && j < audioData.length; j++) {
        sum += audioData[j];
      }
      
      result.push(sum / bandSize);
    }
    
    return result;
  };