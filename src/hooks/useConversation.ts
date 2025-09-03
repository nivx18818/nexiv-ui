import { ConversationContext } from "@/contexts/conversation-context"
import { useContext } from "react"

const useConversation = () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }

  return context.conversation;
}

export default useConversation;
