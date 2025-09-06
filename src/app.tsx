import Chat from "./components/chat";
import { ConversationProvider } from "./contexts/conversation-context";

function App() {
  return (
    <ConversationProvider>
      <Chat />
    </ConversationProvider>
  )
}

export default App;
