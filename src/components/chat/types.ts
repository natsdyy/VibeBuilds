export interface ChatAction {
  label: string;
  path: string;
}

export type Sender = 'bot' | 'user';

export interface Message {
  id: number;
  text: string;
  sender: Sender;
  timestamp: string;
  action?: ChatAction;
}

export interface ChatHandle {
  pattern: string | string[];
  response: string | ((input: string) => string);
  action?: ChatAction | ((input: string) => ChatAction | undefined);
}
