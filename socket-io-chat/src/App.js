import { useState, useEffect, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import ConversationBubble from "./components/ConversationBubble";
import SocketCtrl from "./services/SocketCtrl";
import Logo from "./resources/logo_copy_u.png";
import "./App.scss";

function App() {
  const [messages, setMessages] = useState([]);
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
            userName: "Machine",
            position: "r",
          },
        ];
      });
      setTotalUsers(enterUser.totalUsers);
    });
    socket.on("USER_DISCONNECTED", (goneUser) => {
      console.log(goneUser);
      const time = Date.now();
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            id: `${goneUser.id}-${time}`,
            time: dayjs(time).format("HH:mm"),
            message: `El usuario ${goneUser.id} ha dejado la sala`,
            userName: "Machine",
            position: "r",
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
            position: "r",
          },
        ];
      });
    });
    socket.on("UPDATE_TOTAL_USERS", ({ totalUsers }) => {
      setTotalUsers(totalUsers);
    });
  }, []);

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
              position: "l",
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
      {/* <ConversationBubble
        userName={"Dani"}
        message="Lorem Ipsum"
        time={"10:00"}
        position={"r"}
      /> */}
      <div className="chat-box__container">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder={`${socketId} ${totalUsers}`}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
    </div>
  );
}

export default App;
