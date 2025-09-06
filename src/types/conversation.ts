interface Message {
  id: number;
  role: string;
  content: string;
}

interface Conversation {
  id: string;
  messages: Message[];
}

export type { Message, Conversation };
