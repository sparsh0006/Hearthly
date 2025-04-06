# Hearthly Frontend

A Next.js application for the Hearthly AI therapist platform.

## Overview

Hearthly is an AI-powered therapy application that allows users to have voice or text conversations with an empathetic AI. The application transcribes user speech, processes it through OpenAI's GPT-4o model, and responds with both text and synthesized speech.

## Features

- Voice conversation with AI therapist
- Text chat alternative
- Visualization of voice input
- Dark/light mode support
- Session management (counts and limits)
- Multiple language support

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Backend server running (see backend readme)
- Supabase account and project setup

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd hearthly
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_MOCK_USER_ID=your-uuid-here
```

Replace `your-uuid-here` with a valid UUID that exists in your Supabase users table.

## Running the Application

```bash
npm run dev
# or
yarn dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/               # Next.js App Router files
├── components/        # React components
│   ├── layout/        # Layout components
│   ├── session/       # Session-related components
│   └── ui/            # UI components
├── contexts/          # React contexts
│   ├── AuthContext.tsx
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
├── hooks/             # Custom React hooks
│   ├── useAudio.ts
│   └── useSession.ts
├── pages/             # Next.js Pages Router
│   ├── _app.tsx
│   ├── index.tsx
│   └── session.tsx
├── services/          # API services
│   └── api.ts
├── styles/            # Global styles
│   └── globals.css
├── types/             # TypeScript type definitions
│   └── index.ts
└── utils/             # Utility functions
    ├── animation.ts
    └── audio.ts
```

## Usage

1. Open the application in your browser
2. Click "begin session" to start a therapy session
3. Speak using the microphone or use the text chat
4. The AI will respond both in text and with synthesized speech
5. End the session by clicking the cancel button

## Integration with Backend

The frontend communicates with the backend using REST API calls for:
- Creating and managing sessions
- Sending and receiving messages
- Processing audio
- Playing back synthesized speech

Make sure the backend server is running on port 8000 (default) or update the `NEXT_PUBLIC_API_URL` in your `.env.local` file accordingly.

## Limitations

- Free tier users are limited to 3 sessions
- Audio processing requires microphone permissions

## Troubleshooting

- If you encounter CORS issues, make sure the backend is properly configured to allow requests from your frontend origin
- For audio-related issues, check browser permissions for microphone access
- If sessions aren't being created, verify that the UUID in your environment variables exists in your database

## License

[MIT](LICENSE)
