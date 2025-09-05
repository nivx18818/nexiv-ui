import { conversationService } from "@/services";
import {
  createContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { Navigate, useParams } from "react-router";

import type { HttpResponse } from "@/utils/http-request.util";

interface Conversation {
  id?: string;
}

interface ConversationContextType {
  conversation: Conversation | null;
}

const ConversationContext = createContext<ConversationContextType | null>(null);

type ConversationProviderProps = PropsWithChildren<object>;

function ConversationProvider({ children }: ConversationProviderProps) {
  const { id } = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const isCreatingRef = useRef(false);

  useEffect(() => {
    (async () => {
      if (!id) {
        if (isCreatingRef.current) return;
        isCreatingRef.current = true;

        const res = await conversationService.create();
        setConversation(res.data as Conversation);

        return;
      }

      const res = (await conversationService.getById(
        id,
      )) as HttpResponse<object>;

      isCreatingRef.current = false;
      setConversation(res.data);
    })();
  }, [id]);

  const contextValue = { conversation };

  return (
    <ConversationContext.Provider value={contextValue}>
      {isCreatingRef.current && (
        <Navigate to={`/c/${conversation?.id}`} replace={true} />
      )}
      {children}
    </ConversationContext.Provider>
  );
}

export { ConversationContext, ConversationProvider };
