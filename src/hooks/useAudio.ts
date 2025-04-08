// src/hooks/useAudio.ts
import { useState, useEffect, useRef } from 'react';
import { processAudio } from '../services/api';

export const useAudio = () => {
  const [isListening, setIsListening] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<{ audio: string; transcript: string } | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const startListening = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio analysis
      const audioContext = audioContextRef.current;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;
      
      // Set up recording
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.start();
      setIsListening(true);
      
      // Start audio data collection for visualization
      const updateAudioData = () => {
        if (!isListening) return;
        
        if (analyserRef.current && dataArrayRef.current) {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          setAudioData(Array.from(dataArrayRef.current));
        }
        
        requestAnimationFrame(updateAudioData);
      };
      
      updateAudioData();
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  
  const stopListening = async () => {
    if (!mediaRecorderRef.current || !streamRef.current) return;
    
    // Stop recording
    mediaRecorderRef.current.stop();
    setIsListening(false);
    setIsProcessing(true);
    
    // Process the recorded audio
    try {
      await new Promise<void>((resolve) => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const reader = new FileReader();
            
            reader.onloadend = async () => {
              const base64Audio = reader.result?.toString().split(',')[1];
              
              if (base64Audio) {
                try {
                  const result = await processAudio(base64Audio);
                  setResponse(result);
                  
                  // Play the audio response
                  if (result.audio) {
                    const audio = new Audio(`data:audio/mp3;base64,${result.audio}`);
                    audio.play();
                  }
                } catch (error) {
                  console.error("Error processing audio:", error);
                }
              }
              
              setIsProcessing(false);
              resolve();
            };
            
            reader.readAsDataURL(audioBlob);
          };
        } else {
          setIsProcessing(false);
          resolve();
        }
      });
    } catch (error) {
      console.error("Error processing recording:", error);
      setIsProcessing(false);
    }
    
    // Cleanup
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    
    audioChunksRef.current = [];
    setAudioData([]);
  };
  
  useEffect(() => {
    return () => {
      stopListening();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  return {
    isListening,
    isProcessing,
    audioData,
    response,
    startListening,
    stopListening
  };
};