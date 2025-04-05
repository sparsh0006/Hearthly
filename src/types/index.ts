export type SessionStatus = 'idle' | 'listening' | 'processing' | 'responding';

export interface SessionState {
  status: SessionStatus;
  message: string;
}