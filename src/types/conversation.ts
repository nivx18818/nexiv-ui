interface MessageType {
  id: number;
  role: "model" | "user";
  content: string;
}

interface Conversation {
  id: string;
  messages: MessageType[];
}

export type { MessageType, Conversation };
