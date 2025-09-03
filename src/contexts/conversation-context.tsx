import { conversationService } from "@/services";
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useParams } from "react-router";

import type { HttpResponse } from "@/utils/http-request.util";

interface ConversationContextType {
  conversation: object | null;
}

const ConversationContext = createContext<ConversationContextType | null>(null);

type ConversationProviderProps = PropsWithChildren<object>;

function ConversationProvider({ children }: ConversationProviderProps) {
  const { id } = useParams();
  const [conversation, setConversation] = useState<object | null>({});

  useEffect(() => {
    (async () => {
      const res = (
        id
          ? await conversationService.getById(id)
          : await conversationService.create()
      ) as HttpResponse<object>;
      setConversation(res.data);
    })();
  });

  const contextValue = { conversation };

  return (
    <ConversationContext.Provider value={contextValue}>
      {children}
    </ConversationContext.Provider>
  );
}

export default ConversationProvider;
export { ConversationContext };
