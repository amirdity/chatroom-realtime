
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";

export default function App() {
  return <div className="container">
    <List />
    <Chat />
    <Detail/>
  </div>;
}