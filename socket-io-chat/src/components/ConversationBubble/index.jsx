import React from "react";
import "./conversarion-bubble.scss";

const ConversationBubble = ({ position = "l", userName, message, time }) => {
  return (
    <div className={`conversation-bubble ${position}`}>
      <div className="wrapper-bubble">
        <span className="name">{userName}</span>
        <span className="content">{message}</span>
        <span className="time">{time}</span>
      </div>
    </div>
  );
};

export default ConversationBubble;
