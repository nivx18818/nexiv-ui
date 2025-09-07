import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ai-elements/prompt-input";
import { useEffect, useState } from "react";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";
import useConversation from "@/hooks/useConversation";
import { conversationService } from "@/services";
import type { MessageType } from "@/types/conversation";

function Chat() {
  const [input, setInput] = useState("");
  const conversation = useConversation();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (conversation?.messages) setMessages(conversation.messages);
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && conversation?.id) {
      const userMessage: MessageType = {
        id: Date.now(),
        role: "user",
        content: input.trim(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      const res = await conversationService.sendMessage(
        conversation.id,
        input.trim(),
      );

      if (res.data) {
        setMessages([...messages, ...res.data]);
      } else {
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="relative mx-auto size-full h-screen max-w-4xl p-6">
      <div className="flex h-full flex-col">
        <Conversation className="modified-scrollbar h-full">
          <ConversationContent>
            {messages?.map((message, index) => (
              <Message key={message.id || index} from={message.role}>
                <MessageContent>
                  <Response>{message.content}</Response>
                </MessageContent>
              </Message>
            ))}
            {isLoading && (
              <Message from="model">
                <MessageContent>
                  <Loader />
                </MessageContent>
              </Message>
            )}
            {status === "submitted" && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4 flex">
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputSubmit disabled={!input.trim()} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}

export default Chat;
