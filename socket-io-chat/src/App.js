import { useState, useEffect, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import ConversationBubble from "./components/ConversationBubble";
import TotalUsersBadge from "./components/TotalUsersBadge";
import SocketCtrl from "./services/SocketCtrl";
import Logo from "./resources/logo_copy_u.png";
import "./App.scss";

function App() {
  const [messages, setMessages] = useState(() => {
    const time = Date.now();
    return [
      {
        id: `i-copy-u-${time}`,
        time: dayjs(time).format("HH:mm"),
        message: `Bienvenido a iCopyU!, se respetuoso con todo el mundo`,
        userName: "iCopyU!",
        position: "l",
      },
    ];
  });
  const [socketId, setSocketId] = useState(null);
  const [totalUsers, setTotalUsers] = useState(1);

  const socket = useMemo(() => {
    return new SocketCtrl();
  }, []);

  useEffect(() => {
    socket.connect((socket) => {
      setSocketId(socket.id);
    });

    socket.on("USER_CONNECTED", (enterUser) => {
      const time = Date.now();
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            id: `${enterUser.id}-${time}`,
            time: dayjs(time).format("HH:mm"),
            message: `El usuario ${enterUser.id} ha entrado en la sala`,
            userName: "iCopyU!",
            position: "l",
          },
        ];
      });
      setTotalUsers(enterUser.totalUsers);
    });
    socket.on("USER_DISCONNECTED", (goneUser) => {
      const time = Date.now();
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            id: `${goneUser.id}-${time}`,
            time: dayjs(time).format("HH:mm"),
            message: `El usuario ${goneUser.id} ha dejado la sala`,
            userName: "iCopyU!",
            position: "l",
          },
        ];
      });
      setTotalUsers(goneUser.totalUsers);
    });
    socket.on("MESSAGE", (messageData) => {
      const time = Date.now();
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            id: `${messageData.userId}-${time}`,
            time: dayjs(messageData.time).format("HH:mm"),
            message: messageData.message,
            userName: messageData.userId,
            position: "l",
          },
        ];
      });
    });
    socket.on("UPDATE_TOTAL_USERS", ({ totalUsers }) => {
      setTotalUsers(totalUsers);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const handleKeyDown = useCallback(
    (e) => {
      const message = e.target.value;
      if (e.keyCode === 13 && message) {
        const time = Date.now();
        setMessages((prevMessages) => {
          return [
            ...prevMessages,
            {
              id: `${socketId}-${time}`,
              time: dayjs(time).format("HH:mm"),
              message,
              userName: socketId,
              position: "r",
            },
          ];
        });
        socket.emit("MESSAGE", {
          time,
          message,
        });
        e.preventDefault();
        e.target.value = "";
      }
    },
    [socketId, socket]
  );

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
