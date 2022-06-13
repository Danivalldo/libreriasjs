import { useEffect } from "react";
import ConversationBubble from "./components/ConversationBubble";
import TotalUsersBadge from "./components/TotalUsersBadge";
import useSocketCtrl from "./hooks/useSocketCtrl";
import Logo from "./resources/logo_copy_u.png";
import "./App.scss";

function App() {
  const { messages, socketId, totalUsers, sendMessage } = useSocketCtrl();

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const handleKeyDown = (e) => {
    const message = e.target.value;
    if (e.keyCode === 13 && message) {
      sendMessage(message);
      e.preventDefault();
      e.target.value = "";
    }
  };

  return (
    <div className="chat-container">
      <div className="container-logo">
        <img src={Logo} alt="" className="logo-app" />
        <TotalUsersBadge totalUsers={totalUsers} />
      </div>
      {messages.map((message) => {
        return (
          <ConversationBubble
            key={message.id}
            userName={message.userName}
            message={message.message}
            time={message.time}
            position={message.position}
          />
        );
      })}
      <div className="chat-box__container">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder={`Tu nombre de usuario es ${socketId}. Escribe algo aquí`}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
    </div>
  );
}

export default App;
