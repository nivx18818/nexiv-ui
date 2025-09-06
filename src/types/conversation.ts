interface Message {
  id: number;
  role: "model" | "user";
  content: string;
}

interface Conversation {
  id: string;
  messages: Message[];
}

export type { Message, Conversation };
