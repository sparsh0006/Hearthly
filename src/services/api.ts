// src/services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function processAudio(audioBase64: string): Promise<{
  audio: string;  // Base64-encoded MP3 audio
  transcript: string;  // Hearthly's transcript
}> {
  try {
    const response = await fetch(`${API_URL}/process-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audio: audioBase64 }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing audio:', error);
    throw error;
  }
}


export async function processText(text: string): Promise<{
    transcript: string;
    audio?: string; // Optional audio response
  }> {
    try {
      const response = await fetch(`${API_URL}/process-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error processing text:', error);
      throw error;
    }
  }